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

  onDelete(e) {
    // TODO(flfuchs) Implement plan deletion
    // let planName = e.target.getAttribute('data-plan-name');
  }

  onPlanClick(e) {
    e.preventDefault();
    PlansActions.choosePlan(e.target.textContent);
    // this.props.history.pushState(null, '/plan/environment');
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
              <Link to={`plans/${item}/edit`} className="btn btn-xs btn-default">Edit</Link>
              <Link to={`plans/${item}/delete`} className="btn btn-xs btn-warning">Delete</Link>
            </div>
          </td>
        </tr>
      );
    });
    // TODO(flfuchs) Put plan creation in a modal instead of opening it in a new page.
    return (
      <div className="row">
        <div className="col-sm-12">
          <Link to="plans/new" className="btn btn-lg btn-success">Create New Plan</Link>
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
      </div>
    );
  }
}
