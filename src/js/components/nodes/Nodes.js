import React from 'react';
import * as Router from 'react-router';

import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { PageHeader } from '../ui/PageHeader';
import IronicApiService from '../../services/IronicApiService';
import NavTab from '../ui/NavTab';
import NodesStore from '../../stores/NodesStore';

export default AuthenticatedComponent(class Nodes extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: []
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

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>Nodes</PageHeader>
          <ul className="nav nav-tabs">
            <NavTab to="freeNodes">Free Nodes</NavTab>
            <NavTab to="discoveredNodes">Discovered Nodes</NavTab>
          </ul>
          <div className="tab-pane">
            <Router.RouteHandler nodes={this.state.nodes}/>
          </div>
        </div>
      </div>
    );
  }
});
