import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import PlansActions from '../../actions/PlansActions';

class Plans extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          {React.cloneElement(this.props.children, {
            currentPlanName: this.props.currentPlanName,
            conflict: this.props.conflict,
            planData: this.props.planData,
            plans: this.props.plans,
            fetchPlans: this.props.fetchPlans
          })}
        </div>
      </div>
    );
  }
}

Plans.propTypes = {
  children: React.PropTypes.node,
  conflict: React.PropTypes.string,
  currentPlanName: React.PropTypes.string,
  fetchPlans: React.PropTypes.func,
  planData: ImmutablePropTypes.map,
  plans: ImmutablePropTypes.list
};

function mapStateToProps(state) {
  return {
    currentPlanName: state.plans.get('currentPlanName'),
    conflict: state.plans.get('conflict'),
    planData: state.plans.get('planData'),
    plans: state.plans.get('all')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlans: () => {
      dispatch(PlansActions.fetchPlans());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
