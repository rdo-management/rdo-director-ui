import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import NavTab from '../ui/NavTab';
import CapabilitiesMap from '../../data/CapabilitiesMap';

export default class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      // plan: PlanStore.getPlan('uuid from route');
      plan: {
        capabilities: CapabilitiesMap.content
      }
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    // PlanStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    // PlanStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    // this.setState({ plan: PlanStore.getPlan('uuid from route') });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>OpenStack Deployment - TEST Plan</PageHeader>
          <ul className="nav nav-tabs">
            <NavTab to="/plan/" onlyActiveOnIndex>Environment</NavTab>
            <NavTab to="/plan/roles">Roles</NavTab>
            <NavTab to="/plan/parameters">Parameters</NavTab>
          </ul>
          <div className="tab-pane">
            {React.cloneElement(this.props.children, {plan: this.state.plan})}
          </div>
        </div>
      </div>
    );
  }
}
Plan.propTypes = {
  children: React.PropTypes.node
};
