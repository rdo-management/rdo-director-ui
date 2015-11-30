import React from 'react';

import { Link } from 'react-router';
import PlansActions from '../../actions/PlansActions';
import PlansStore from '../../stores/PlansStore';

export default class ListPlans extends React.Component {
  constructor() {
    super();
    this.state = {
      plans: PlansStore.getPlanNames()
    };
    this.changeListener = this._onPlansChange.bind(this);
  }

  componentWillMount() {
    PlansActions.listPlans();
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onPlansChange() {
    this.setState({ plans: PlansStore.getPlanNames() });
  }

  onPlanClick(e) {
    e.preventDefault();
    PlansActions.choosePlan(e.target.textContent);
  }

  getActiveIcon(planName) {
    if(planName === PlansStore.getCurrentPlanName()) {
      return (
        <span className="pficon pficon-flag"></span>
      );
    }
    return false;
  }

  render() {
    let plans = this.state.plans.map(item => {
      return (
        <tr key={item}>
          <td>{this.getActiveIcon(item)} <a href=""
                 onClick={this.onPlanClick.bind(this)}>{item}</a></td>
          <td className="plan-list-actions-col">
            <div className="btn-group" role="group">
              <Link to={`/plans/${item}/edit`}
                    query={{tab: 'editPlan'}}
                    className="btn btn-xs btn-default">Edit</Link>
              <Link to={`/plans/${item}/delete`} className="btn btn-xs btn-warning">Delete</Link>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="row">
        <div className="col-sm-12">
          <Link to="/plans/new"
                query={{tab: 'newPlan'}}
                className="btn btn-lg btn-success">Create New Plan</Link>
        </div>
        <div className="col-sm-12">
          <h2>Plans</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {plans}
            </tbody>
          </table>
        </div>
        {this.props.children}
      </div>
    );
  }
}
ListPlans.propTypes = {
  children: React.PropTypes.node
};
