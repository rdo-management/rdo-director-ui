import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ClassNames from 'classnames';
import React from 'react';

import { getValidations,
         getValidationStages,
         getValidationsStatusCounts } from '../../selectors/validations';
import BlankSlate from '../ui/BlankSlate';
import Loader from '../ui/Loader';
import ValidationsActions from '../../actions/ValidationsActions';
import ValidationStage from './ValidationStage';
import ValidationDetail from './ValidationDetail';

class ValidationsList extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetail: null
    };
  }

  componentDidMount() {
    this.props.fetchValidationStages();
  }

  showValidationDetail(uuid) {
    this.setState({ showDetail: uuid });
  }

  hideValidationDetail() {
    this.setState({ showDetail: null });
  }

  renderValidationDetail() {
    if (this.state.showDetail) {
      const validation = this.props.validations.get(this.state.showDetail);
      return (
        <ValidationDetail
          name={validation.name}
          description={validation.description}
          resultDescription={
            JSON.stringify(validation.latest_result.get('detailed_description').toJS())}
          status={validation.status}
          hideValidationDetail={this.hideValidationDetail.bind(this)}/>
      );
    }
  }

  render () {
    const classes = ClassNames({
      'panel-group validation-stages-container col-sm-12': true
    });

    const stages = this.props.validationStages.toList().map(stage => {
      return (
        <ValidationStage key={stage.uuid}
                         validations={stage.validations}
                         name={stage.name}
                         showValidationDetail={this.showValidationDetail.bind(this)}
                         status={stage.status}
                         runValidationStage={this.props.runValidationStage}
                         runValidation={this.props.runValidation}
                         stopValidation={this.props.stopValidation}
                         visible={stage.visible}
                         toggleValidationStageVisibility={
                           this.props.toggleValidationStageVisibility
                         }
                         uuid={stage.uuid}/>
      );
    });

    return (
      <div className="col-sm-12 col-lg-3 sidebar-pf sidebar-pf-right">
        <div className="sidebar-header
                        sidebar-header-bleed-left
                        sidebar-header-bleed-right">
          <div className="actions pull-right">
            <Loader key="rolesLoader"
                    loaded={!(this.props.validationStagesLoaded &&
                              this.props.isFetchingValidationStages)}
                    content="Loading Validations..."
                    inline>
              <a className="link refresh"
                 onClick={this.props.fetchValidationStages.bind(this)}>
                <span className="pficon pficon-refresh"></span> Refresh
              </a>
            </Loader>
          </div>
          <h2 className="h4">Validations</h2>
        </div>
        <Loader loaded={this.props.validationStagesLoaded}
                content="Loading Validations..."
                height={80}>
          <div className="row">
            <div className={classes}>
              {this.props.validationStages.isEmpty() ?
                <BlankSlate iconClass="pficon pficon-flag"
                            title="No Validations"
                            message="There are no validations at this time." /> : stages}
            </div>
          </div>
          {this.renderValidationDetail()}
        </Loader>
      </div>
    );
  }
}

ValidationsList.propTypes = {
  fetchValidationStages: React.PropTypes.func.isRequired,
  isAuthenticating: React.PropTypes.bool.isRequired,
  isFetchingValidationStages: React.PropTypes.bool.isRequired,
  runValidation: React.PropTypes.func.isRequired,
  runValidationStage: React.PropTypes.func.isRequired,
  stopValidation: React.PropTypes.func.isRequired,
  toggleValidationStageVisibility: React.PropTypes.func.isRequired,
  validationStages: ImmutablePropTypes.map.isRequired,
  validationStagesLoaded: React.PropTypes.bool.isRequired,
  validations: ImmutablePropTypes.map.isRequired,
  validationsStatusCounts: ImmutablePropTypes.record.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    fetchValidationStages: () => {
      dispatch(ValidationsActions.fetchValidationStages());
    },
    fetchValidationGroups: () => dispatch(ValidationsActions.fetchValidationGroups()),
    runValidationStage: (uuid) => {
      dispatch(ValidationsActions.runValidationStage(uuid));
    },
    runValidation: (uuid) => {
      dispatch(ValidationsActions.runValidation(uuid));
    },
    stopValidation: (uuid) => {
      dispatch(ValidationsActions.stopValidation(uuid));
    },
    toggleValidationStageVisibility: (uuid) => {
      dispatch(ValidationsActions.toggleValidationStageVisibility(uuid));
    }
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticating: state.login.get('isAuthenticating'),
    isFetchingValidationStages: state.validations.get('isFetching'),
    validationStages: getValidationStages(state),
    validationStagesLoaded: state.validations.get('loaded'),
    validations: getValidations(state),
    validationsStatusCounts: getValidationsStatusCounts(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidationsList);
