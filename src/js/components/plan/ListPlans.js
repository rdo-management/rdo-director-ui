import when from 'when';
import React from 'react';

import AppDispatcher from '../../dispatchers/AppDispatcher.js';
import AuthenticatedComponent from '../utils/AuthenticatedComponent';
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
    this.onChoose = this._onChoose.bind(this);
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

  _onChoose(e) {
    let planName = e.target.getAttribute('data-plan-name');
    console.log('engage ', planName);
  }

  _onDelete(e) {
    let planName = e.target.getAttribute('data-plan-name');
    console.log('delete ', planName);
  }

  render() {
    let plans = this.state.plans.map(item => {
      return (
        <tr key={item}>
          <td>{item}</td>
          <td>
            <button onClick={this.onChoose} data-plan-name={item} className="btn btn-xs btn-success">Choose</button> <button data-plan-name={item} className="btn btn-xs btn-info">Edit</button> <button onClick={this.onDelete} data-plan-name={item} className="btn btn-xs btn-danger">Delete</button>
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
              <th>Plan Name</th>
              <th>Actions</th>
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
