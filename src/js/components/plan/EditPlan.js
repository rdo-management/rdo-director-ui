import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import PlanEditFormTabs from './PlanEditFormTabs';
import PlansActions from '../../actions/PlansActions';

class EditPlan extends React.Component {

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
  }

  componentDidMount() {
    this.state.plan.name = this.getNameFromUrl();
    this.props.fetchPlan(this.state.plan.name);
  }

  onPlanFilesChange(currentValues) {
    if(currentValues && currentValues.planFiles) {
      this.props.selectFiles(currentValues.planFiles);
    }
  }

  onFormSubmit(form) {
    let planFiles = {};
    this.props.currentPlanFiles.forEach(item => {
      // only upload new or changed files
      if(item.info.changed || item.info.newFile) {
        planFiles[item.name] = {};
        planFiles[item.name].contents = item.content;
        // TODO(jtomasek): user can identify capabilities-map in the list of files
        // (dropdown select or sth)
        if(item.name.match('^capabilities[-|_]map\.yaml$')) {
          planFiles[item.name].meta = { 'file-type': 'capabilities-map' };
        }
      }
    });
    this.props.updatePlan(this.state.plan.name, planFiles);
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
                <h4>Update {this.state.plan.name} Files</h4>
              </div>
              <div className="modal-body">
                <FormErrorList errors={this.state.formErrors}/>
                <PlanEditFormTabs currentTab={this.props.location.query.tab || 'editPlan'}
                                  planFiles={this.props.currentPlanFiles}
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
  currentPlanFiles: ImmutablePropTypes.list,
  fetchPlan: React.PropTypes.func,
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  selectFiles: React.PropTypes.func,
  updatePlan: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    currentPlanFiles: state.plans.get('currentPlanFiles')
                        .toList()
                        .sortBy(item => item.name)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlan: (planName, files) => {
      dispatch(PlansActions.updatePlan(planName, files));
    },
    fetchPlan: planName => {
      dispatch(PlansActions.fetchPlan(planName));
    },
    selectFiles: planFiles => {
      dispatch(PlansActions.planFilesSelected(planFiles));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
