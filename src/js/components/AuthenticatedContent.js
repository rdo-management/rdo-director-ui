import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import Loader from './ui/Loader';
import LoginActions from '../actions/LoginActions';
import PlansActions from '../actions/PlansActions';
import NavBar from './NavBar';
import ValidationsList from './validations/ValidationsList';
import ValidationsActions from '../actions/ValidationsActions';

class AuthenticatedContent extends React.Component {
  componentDidMount() {
    this.props.fetchPlans();
  }

  render() {
    return (
      <Loader loaded={this.props.plansLoaded &&
                      (!!this.props.currentPlanName || this.props.noPlans)}
              content="Loading Deployments..."
              global>
        <header>
          <NavBar user={this.props.user}
                  showValidations={this.props.showValidations}
                  onShowValidationsToggle={this.props.toggleShowValidations}
                  onLogout={this.props.logoutUser.bind(this)}/>
        </header>
        <div className="wrapper-fixed-body container-fluid">
          <div className="row">
            <div className={`col-sm-12 ${this.props.showValidations ? 'col-lg-9' : null}`}>
              {this.props.children}
            </div>
            <ValidationsList/>
          </div>
        </div>
      </Loader>
    );
  }
}
AuthenticatedContent.propTypes = {
  children: React.PropTypes.node,
  currentPlanName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  fetchPlans: React.PropTypes.func,
  logoutUser: React.PropTypes.func.isRequired,
  noPlans: React.PropTypes.bool,
  plansLoaded: React.PropTypes.bool,
  showValidations: React.PropTypes.bool,
  toggleShowValidations: React.PropTypes.func.isRequired,
  user: ImmutablePropTypes.map
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlans: () => dispatch(PlansActions.fetchPlans()),
    logoutUser: () => dispatch(LoginActions.logoutUser()),
    toggleShowValidations: () => dispatch(ValidationsActions.toggleShowValidations())
  };
};

const mapStateToProps = state => {
  return {
    currentPlanName: state.currentPlan.currentPlanName,
    noPlans: state.plans.get('all').isEmpty(),
    plansLoaded: state.plans.get('plansLoaded'),
    showValidations: state.validations.get('showValidations'),
    user: state.login.getIn(['keystoneAccess', 'user'])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContent);
