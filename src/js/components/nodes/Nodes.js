import React from 'react';
import when from 'when';

import IronicApiErrorHandler from '../../services/IronicApiErrorHandler';
import IronicApiService from '../../services/IronicApiService';
import NavTab from '../ui/NavTab';
import NodesActions from '../../actions/NodesActions';
import NodesStore from '../../stores/NodesStore';
import NotificationActions from '../../actions/NotificationActions';

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
    this._fetchNodes();
  }

  componentWillUnmount() {
    NodesStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ nodes: NodesStore.getState().nodes });
  }

  _fetchNodes() {
    IronicApiService.getNodes().then((response) => {
      return when.all(response.nodes.map((node) => {
        return IronicApiService.getNode(node.uuid);
      }));
    }).then((nodes) => {
      NodesActions.listNodes(nodes);
    }).catch((error) => {
      console.error('Error in Nodes._fetchNodes', error);
      let errorHandler = new IronicApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  refreshResults(e) {
    e.preventDefault();
    this._fetchNodes();
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
            <NavTab to="nodes/registered">
              Registered<span className="badge">{this.state.nodes.registered.length}</span>
            </NavTab>
            <NavTab to="nodes/discovered">
              Discovered<span className="badge">{this.state.nodes.discovered.length}</span>
            </NavTab>
            <NavTab to="nodes/provisioned">
              Provisioned<span className="badge">{this.state.nodes.provisioned.length}</span>
            </NavTab>
            <NavTab to="nodes/maintenance">
              Maintenance<span className="badge">{this.state.nodes.maintenance.length}</span>
            </NavTab>
          </ul>
          <div className="tab-pane">
            {React.cloneElement(this.props.children, {nodes: this.state.nodes})}
          </div>

          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">
                <span className="pficon pficon-help"></span> Nodes
              </h3>
            </div>
            <div className="panel-body">
              <p>To register Nodes specified in instackenv.json run</p>
              <pre>tripleo.sh --register-nodes</pre>
              <p>To introspect registered Nodes run</p>
              <pre>tripleo.sh --introspect-nodes</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Nodes.propTypes = {
  children: React.PropTypes.node
};
