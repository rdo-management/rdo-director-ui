import React from 'react';

import IronicApiService from '../../services/IronicApiService';
import NavTab from '../ui/NavTab';
import NodesStore from '../../stores/NodesStore';

export default class Nodes extends React.Component {
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

  refreshResults(e) {
    e.preventDefault();
    IronicApiService.getNodes();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="page-header">
            <div className="actions pull-right">
              <a href="" onClick={this.refreshResults.bind(this)}>
                <span className="pficon pficon-refresh"></span>
                Refresh Results
              </a>
            </div>
            <h1>Nodes</h1>
          </div>
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
      </div>
    );
  }
}
Nodes.propTypes = {
  children: React.PropTypes.node
};
