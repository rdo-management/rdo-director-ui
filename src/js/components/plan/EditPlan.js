import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import { getFilesList } from '../../selectors/plans';
import PlanEditFormTabs from './PlanEditFormTabs';
import PlansActions from '../../actions/PlansActions';

class EditPlan extends React.Component {

  constructor() {
    super();
    this.state = {
      planName: undefined,
      canSubmit: false,
      formErrors: []
    };
  }

  componentDidMount() {
    this.state.planName = this.getNameFromUrl();
    this.props.fetchPlan(this.state.planName);
    this.props.editPlan(this.state.planName);
  }

  componentWillUnmount() {
    this.props.discardPlanEdit();
  }

  onPlanFilesChange(currentValues) {
    if(currentValues && currentValues.planFiles) {
      this.props.selectFiles(currentValues.planFiles, this.state.planName);
    }
  }

  onFormSubmit(form) {
    let planFiles = {};
    this.props.filesList.map(item => {
      // only upload new or changed files
      if(item.get('info').get('changed') || item.get('info').get('newFile')) {
        planFiles[item.get('name')] = {};
        planFiles[item.get('name')].contents = item.get('contents');
        // TODO(jtomasek): user can identify capabilities-map in the list of files
        // (dropdown select or sth)
        if(item.get('name').match('^capabilities[-|_]map\.yaml$')) {
          planFiles[item.get('name')].meta = { 'file-type': 'capabilities-map' };
        }
      }
    });
    this.props.updatePlan(this.state.planName, planFiles);
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

  render() {
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
                <h4>Update {this.state.planName} Files</h4>
              </div>
              <div className="modal-body">
                <FormErrorList errors={this.state.formErrors}/>
                <PlanEditFormTabs currentTab={this.props.location.query.tab || 'editPlan'}
                                  planFiles={this.props.filesList}
                                  planName={this.state.planName}/>
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
  discardPlanEdit: React.PropTypes.func,
  editPlan: React.PropTypes.func,
  fetchPlan: React.PropTypes.func,
  filesList: ImmutablePropTypes.list,
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  planData: ImmutablePropTypes.list,
  selectFiles: React.PropTypes.func,
  updatePlan: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    filesList: getFilesList(state),
    planData: state.plans.get('all')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    discardPlanEdit: () => {
      dispatch(PlansActions.discardPlanEdit());
    },
    editPlan: planName => {
      dispatch(PlansActions.editPlan(planName));
    },
    fetchPlan: planName => {
      dispatch(PlansActions.fetchPlan(planName));
    },
    selectFiles: (files, planName) => {
      dispatch(PlansActions.selectFiles(files, planName));
    },
    updatePlan: (planName, files) => {
      dispatch(PlansActions.updatePlan(planName, files));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
