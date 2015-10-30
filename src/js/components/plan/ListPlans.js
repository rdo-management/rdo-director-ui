import when from 'when';
import React from 'react';

import AppDispatcher from '../../dispatchers/AppDispatcher.js';
import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { Link } from 'react-router'
import PlansStore from '../../stores/PlansStore';
import PlansActions from '../../actions/PlansActions';
import PlansConstants from '../../constants/PlansConstants';
import TripleOApiService from '../../services/TripleOApiService';

export default AuthenticatedComponent (class ListPlans extends React.Component {

  constructor() {
    super();
    this.state = {
      plans: []
    };
    this.changeListener = this._changeListener.bind(this);
    this.onDelete = this._onDelete.bind(this);
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
    PlansActions.listPlans();
  }

  componentWillMount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _changeListener() {
    this.setState({plans: PlansStore.getState().plans});
  }

  _onDelete(e) {
    let planName = e.target.getAttribute('data-plan-name');
    console.log('delete ', planName);
  }

  render() {
    let plans = this.state.plans.map(item => {
      let envLink = 'plan/' + item + '/environment';
      return (
        <tr key={item}>
          <td><Link to={envLink}>{item}</Link></td>
          <td className="plan-list-actions-col">
            <div className="btn-group" role="group">
              <Link to={envLink} className="btn btn-xs btn-default">Choose</Link>
              <Link to="plan/list" className="btn btn-xs btn-default">Edit</Link>
              <button onClick={this.onDelete} data-plan-name={item} className="btn btn-xs btn-warning">Delete</button>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <div>
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
    );
  }
});
