import { connect } from 'react-redux';
import React from 'react';

class Plans extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Plans.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentPlanName: state.currentPlanName,
    conflict: state.conflict,
    planData: state.planData,
    plans: state.plans
  };
};

export default connect(mapStateToProps)(Plans);
