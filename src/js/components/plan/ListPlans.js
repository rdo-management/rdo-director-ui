import when from 'when';
import React from 'react';

import AppDispatcher from '../../dispatchers/AppDispatcher.js';
import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { Link } from 'react-router'
import PlansActions from '../../actions/PlansActions';
import PlansConstants from '../../constants/PlansConstants';
import PlansStore from '../../stores/PlansStore';

export default class ListPlans extends React.Component {

  constructor() {
    super();
    this.state = {
      plans: []
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
    let planName = e.target.getAttribute('data-plan-name');
    console.log('delete ', planName);
  }

  onPlanClick(e) {
    let planName = e.target.getAttribute('data-plan-name');
    PlansActions.choosePlan(planName);
  }

  render() {
    let plans = this.state.plans.map(item => {
      return (
        <tr key={item}>
          <td><Link to="/plan/environment" onClick={this.onPlanClick} data-plan-name={item}>{item}</Link></td>
          <td className="plan-list-actions-col">
            <div className="btn-group" role="group">
              <Link to="plans/list" className="btn btn-xs btn-default">Edit</Link>
              <button onClick={this.onDelete.bind(this)} data-plan-name={item} className="btn btn-xs btn-warning">Delete</button>
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
