import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import { getFilesList } from '../../selectors/plans';
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

  componentWillUnmount() {
    this.props.discardPlanEdit();
  }

  onPlanFilesChange(currentValues, isChanged) {
    let files = currentValues.planFiles;
    if (files && files != []) {
      this.props.selectFiles(currentValues.planFiles);
    }
  }

  onFormSubmit(formData, resetForm, invalidateForm) {
    let planFiles = {};
    this.props.filesList.map(item => {
      planFiles[item.get('name')] = {};
      planFiles[item.get('name')].contents = item.get('contents');
      // TODO(jtomasek): user can identify capabilities-map in the list of files
      // (dropdown select or sth)
      if(item.get('name').match('^capabilities[-|_]map\.yaml$')) {
        planFiles[item.get('name')].meta = { 'file-type': 'capabilities-map' };
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
                                planFiles={this.props.filesList} />
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
  discardPlanEdit: React.PropTypes.func,
  filesList: ImmutablePropTypes.list,
  location: React.PropTypes.object,
  selectFiles: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    filesList: getFilesList(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPlan: (planName, files) => {
      dispatch(PlansActions.createPlan(planName, files));
    },
    discardPlanEdit: () => {
      dispatch(PlansActions.discardPlanEdit());
    },
    selectFiles: (files, planName) => {
      dispatch(PlansActions.selectFiles(files, planName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlan);
