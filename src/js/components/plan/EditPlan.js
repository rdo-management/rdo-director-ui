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
      name: undefined,
      files: [],
      canSubmit: false,
      formErrors: []
    };
  }

  onPlanFilesChange(currentValues, isChanged) {
    let files = currentValues.planFiles;
    if (files && files != []) {
      this.setState({ files: files });
    }
  }

  onFormSubmit(form) {
    let planFiles = {};
    this.state.files.forEach(item => {
      planFiles[item.name] = {};
      planFiles[item.name].contents = item.content;
      // TODO(jtomasek): user can identify capabilities-map in the list of files
      // (dropdown select or sth)
      if(item.name === 'capabilities_map.yaml') {
        planFiles[item.name].meta = { 'file-type': 'capabilities-map' };
      }
    });

    let planName = this.getNameFromUrl();
    if(planName) {
      TripleOApiService.updatePlan(planName, planFiles).then(result => {
        this.props.history.pushState(null, 'plans/list');
        NotificationActions.notify({
          title: 'Plan Updated',
          message: `The plan ${planName} was successfully updated.`,
          type: 'success'
        });
      }).catch(error => {
        console.error('Error in TripleOApiService.updatePlan', error);
        let errorHandler = new TripleOApiErrorHandler(error);
        this.setState({
          formErrors: errorHandler.errors.map((error) => {
            return {
              title: 'Error Updating Plan',
              message: `The plan ${planName} could not be updated. ${error.message}`,
              type: 'error'
            };
          })
        });
      });
    }
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
                <h4>Update {this.getNameFromUrl()} Files</h4>
              </div>
              <div className="modal-body">
                <FormErrorList errors={this.state.formErrors}/>
                <PlanEditFormTabs currentTab={this.props.location.query.tab || 'editPlan'}
                                  planFiles={this.state.files}
                                  planName={this.getNameFromUrl()}/>
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
