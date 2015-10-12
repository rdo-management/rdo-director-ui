import React from 'react';

import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { PageHeader } from '../ui/PageHeader';
import IronicApiService from '../../services/IronicApiService';
import NavTab from '../ui/NavTab';
import NodesStore from '../../stores/NodesStore';

export default AuthenticatedComponent(class Nodes extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: {
        all: [],
        registered: [],
        discovered: [],
        provisioned: [],
        maintenance: []
      }
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    IronicApiService.getNodes();
    NodesStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    NodesStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ nodes: NodesStore.getState().nodes });
  }

  _filterNodes() {
    switch(this.props.children.type.name) {
    case 'RegisteredNodesTabPane':
      return this.state.nodes.registered;
    case 'DiscoveredNodesTabPane':
      return this.state.nodes.discovered;
    case 'ProvisionedNodesTabPane':
      return this.state.nodes.provisioned;
    case 'MaintenanceNodesTabPane':
      return this.state.nodes.maintenance;
    default:
      return this.state.nodes;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>Nodes</PageHeader>
          <ul className="nav nav-tabs">
            <NavTab to="/nodes/" onlyActiveOnIndex>Registered</NavTab>
            <NavTab to="/nodes/discovered">Discovered</NavTab>
            <NavTab to="/nodes/provisioned">Provisioned</NavTab>
            <NavTab to="/nodes/maintenance">Maintenance</NavTab>
          </ul>
          <div className="tab-pane">
            {React.cloneElement(this.props.children, {nodes: this._filterNodes()})}
          </div>
        </div>
      </div>
    );
  }
});
