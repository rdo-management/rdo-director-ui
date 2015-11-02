import React from 'react';

import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { PageHeader } from '../ui/PageHeader';
import NavTab from '../ui/NavTab';
import NodesStore from '../../stores/NodesStore';

export default AuthenticatedComponent(class Nodes extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: NodesStore.getState().nodes
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    NodesStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    NodesStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ nodes: NodesStore.getState().nodes });
  }

  render() {
    return (
      <div className="rdo-base-page">
        <PageHeader>
          <h1>Nodes</h1>
        </PageHeader>
        <ul className="nav nav-tabs">
          <NavTab to="/nodes/" onlyActiveOnIndex>Registered</NavTab>
          <NavTab to="/nodes/discovered">Discovered</NavTab>
          <NavTab to="/nodes/provisioned">Provisioned</NavTab>
          <NavTab to="/nodes/maintenance">Maintenance</NavTab>
        </ul>
        <div className="tab-pane">
          {React.cloneElement(this.props.children, {nodes: this.state.nodes})}
        </div>
      </div>
    );
  }
});
