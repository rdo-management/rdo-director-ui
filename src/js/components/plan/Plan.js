import { Link } from 'react-router';
import React from 'react';

import NoPlans from './NoPlans';
import PlansStore from '../../stores/PlansStore';

export default class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlanName: PlansStore.getCurrentPlanName()
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ currentPlanName: PlansStore.getCurrentPlanName() });
  }

  render() {
    return (
      <div className="row">
        {this.state.currentPlanName ? (
          <div className="col-sm-12">
            <div className="page-header">
              <div className="actions pull-right">
                <a href="#" className="btn btn-primary">
                  <span className="fa fa-plus"/> Register Nodes
                </a>
              </div>
              <h1>OpenStack Deployment - {this.state.currentPlanName}</h1>
              <p>List of enabled Environment names goes here <Link to="/overview/environment">Edit</Link></p>
              <p>Configure Deployment Parameters <Link to="/overview/parameters">Parameters</Link></p>
            </div>
            {React.cloneElement(this.props.children, {currentPlanName: this.state.currentPlanName})}
          </div>
        ) : (
          <div className="col-sm-12">
            <NoPlans/>
          </div>
        )}
      </div>
    );
  }
}

Plan.propTypes = {
  children: React.PropTypes.node
};
