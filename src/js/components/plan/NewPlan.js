import Formsy from 'formsy-react';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import NotificationActions from '../../actions/NotificationActions';
import PlansActions from '../../actions/PlansActions';
import PlanFormTabs from './PlanFormTabs';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';
import TripleOApiService from '../../services/TripleOApiService';

export default class NewPlan extends React.Component {

  constructor() {
    super();
    this.state = {
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

  onFormSubmit(formData, resetForm, invalidateForm) {
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

    TripleOApiService.createPlan(formData.planName, planFiles).then(result => {
      PlansActions.listPlans();
      this.props.history.pushState(null, 'plans/list');
      NotificationActions.notify({
        title: 'Plan Created',
        message: `The plan ${formData.planName} was successfully created.`,
        type: 'success'
      });
    }).catch(error => {
      console.error('Error in NewPlan.onFormSubmit', error);
      let errorHandler = new TripleOApiErrorHandler(error);
      this.setState({
        formErrors: errorHandler.errors.map((error) => {
          return {
            title: 'Error Creating Plan',
            message: `The plan ${formData.planName} could not be created. ${error.message}`,
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

  render () {
    return (
      <div>
        <div className="modal modal-routed in" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <Formsy.Form ref="NewPlanForm"
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
                  <h4 className="modal-title">Create New Plan</h4>
                </div>
                <div className="modal-body">
                  <FormErrorList errors={this.state.formErrors}/>
                  <PlanFormTabs currentTab={this.props.location.query.tab || 'newPlan'}
                                planFiles={this.state.files} />
                </div>
                <div className="modal-footer">
                  <button disabled={!this.state.canSubmit}
                          className="btn btn-primary"
                          type="submit">
                    Upload Files and Create Plan
                  </button>
                  <Link to="/plans/list" type="button" className="btn btn-default" >Cancel</Link>
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
NewPlan.propTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object
};
