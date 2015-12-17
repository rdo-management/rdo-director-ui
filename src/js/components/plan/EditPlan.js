import Formsy from 'formsy-react';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import NotificationActions from '../../actions/NotificationActions';
import PlanEditFormTabs from './PlanEditFormTabs';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';
import TripleOApiService from '../../services/TripleOApiService';

export default class EditPlan extends React.Component {

  constructor() {
    super();
    this.state = {
      plan: {
        name: undefined,
        files: []
      },
      filesObj: {},
      canSubmit: false,
      formErrors: []
    };
    this.processPlanFiles = this._processPlanFiles.bind(this);
    this.createFilesArray = this._createFilesArray.bind(this);
  }

  componentDidMount() {
    this.state.plan.name = this.getNameFromUrl();
    TripleOApiService.getPlan(this.state.plan.name).then(result => {
      this.processPlanFiles(result.plan.files);
      this.setState({ plan: {
        name: this.state.plan.name,
        files: this.createFilesArray()
      }});
    }).catch(error => {
      console.error('Error in TripleOApiService.getPlan', error); //eslint-disable-line no-console
      let errorHandler = new TripleOApiErrorHandler(error);
      this.setState({
        formErrors: errorHandler.errors.map((error) => {
          return {
            title: 'Error Retrieving Plan Data',
            message: `The plan ${this.state.plan.name} could not be retrieved. ${error.message}`,
            type: 'error'
          };
        })
      });
    });
  }

  _createFilesArray() {
    let arr = [];
    for(let key in this.state.filesObj) {
      arr.push({
        name: key,
        content: this.state.filesObj[key].content,
        info: this.state.filesObj[key].info
      });
    }
    return arr.sort((a, b) => {
      if (a.info.newFile && !b.info.newFile) {
        return -1;
      }
      else if (b.info.newFile && !a.info.newFile) {
        return 1;
      }
      else if (a.info.changed && !b.info.changed) {
        return -1;
      }
      else if (b.info.changed && !a.info.changed) {
        return 1;
      }
      else if(a.name > b.name) {
        return 1;
      }
      else if(a.name < b.name) {
        return -1;
      }
      else {
        return 0;
      }
    });
  }

  _processPlanFiles(planFilesObj) {
    for(let key in planFilesObj) {
      let item = planFilesObj[key];
      let obj = this.state.filesObj[key] || {};
      obj.name = key;
      if(!obj.info) {
        obj.info = {
          changed: false
        };
      }
      obj.info.newFile = false;
      // If the same file has been selected from disk:
      // Are the contents the same?
      if (obj.content && obj.content !== item.contents) {
        obj.info.changed = true;
      }
      else {
        obj.content = item.contents;
      }
      this.state.filesObj[key] = obj;
    }
  }

  onPlanFilesChange(currentValues, isChanged) {
    let files = currentValues.planFiles;
    if (files && files != []) {
      files.forEach(item => {
        let obj = this.state.filesObj[item.name] || {};
        obj.name = item.name;
        if(!obj.info) {
          obj.info = {
            newFile: true
          };
        }
        // If the same file has been selected from disk:
        // Are the contents the same?
        obj.info.changed = (obj.content && obj.content !== item.content);
        obj.content = item.content;
        this.state.filesObj[item.name] = obj;
      });
      this.setState({ plan: {
        name: this.state.plan.name,
        files: this.createFilesArray()
      }});
    }
  }

  onFormSubmit(form) {
    let planFiles = {};
    this.state.plan.files.forEach(item => {
      // online upload new or changed files
      if(item.info.changed || item.info.newFile) {
        planFiles[item.name] = {};
        planFiles[item.name].contents = item.content;
        // TODO(jtomasek): user can identify capabilities-map in the list of files
        // (dropdown select or sth)
        if(item.name === 'capabilities_map.yaml') {
          planFiles[item.name].meta = { 'file-type': 'capabilities-map' };
        }
      }
    });
    TripleOApiService.updatePlan(this.state.plan.name, planFiles).then(result => {
      this.props.history.pushState(null, 'plans/list');
      NotificationActions.notify({
        title: 'Plan Updated',
        message: `The plan ${this.state.plan.name} was successfully updated.`,
        type: 'success'
      });
    }).catch(error => {
      console.error('Error in TripleOApiService.updatePlan', error); //eslint-disable-line no-console
      let errorHandler = new TripleOApiErrorHandler(error);
      this.setState({
        formErrors: errorHandler.errors.map((error) => {
          return {
            title: 'Error Updating Plan',
            message: `The plan ${this.state.plan.name} could not be updated. ${error.message}`,
            type: 'error'
          };
        })
      });
    });
  }

  onFormValid() {
    this.setState({canSubmit: true});
  }

  onFormInvalid() {
    this.setState({canSubmit: false});
  }

  getNameFromUrl() {
    let planName = this.props.params.planName || '';
    return planName.replace(/[^A-Za-z0-9_-]*/g, '');
  }

  render () {
    return (
      <div>
        <div className="modal modal-routed in" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <Formsy.Form ref="EditPlanForm"
                           role="form"
                           className="form-horizontal"
                           onChange={this.onPlanFilesChange.bind(this)}
                           onValidSubmit={this.onFormSubmit.bind(this)}
                           onValid={this.onFormValid.bind(this)}
                           onInvalid={this.onFormInvalid.bind(this)}>
              <div className="modal-header">
                <Link to="/plans/list"
                     type="button"
                     className="close">
                     <span aria-hidden="true">&times;</span>
                </Link>
                <h4>Update {this.state.plan.name} Files</h4>
              </div>
              <div className="modal-body">
                <FormErrorList errors={this.state.formErrors}/>
                <PlanEditFormTabs currentTab={this.props.location.query.tab || 'editPlan'}
                                  planFiles={this.state.plan.files}
                                  planName={this.state.plan.name}/>
              </div>
              <div className="modal-footer">
                <button disabled={!this.state.canSubmit}
                        className="btn btn-primary btn-lg"
                        type="submit">
                  Upload Files and Update Plan
                </button>
              </div>
              </Formsy.Form>
            </div>
          </div>
        </div>
        <div className="modal-backdrop in"></div>
      </div>
    );
  }
}

EditPlan.propTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  params: React.PropTypes.object
};
