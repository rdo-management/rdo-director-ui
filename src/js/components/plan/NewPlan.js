import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import PlansActions from '../../actions/PlansActions';
import PlanFormTabs from './PlanFormTabs';

class NewPlan extends React.Component {

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
      if(item.name.match('^capabilities[-|_]map\.yaml$')) {
        planFiles[item.name].meta = { 'file-type': 'capabilities-map' };
      }
    });
    this.props.createPlan(formData.planName, planFiles);
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
  createPlan: React.PropTypes.func,
  location: React.PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    createPlan: (planName, files) => {
      dispatch(PlansActions.createPlan(planName, files));
    }
  };
}

export default connect(() => { return {}; }, mapDispatchToProps)(NewPlan);
