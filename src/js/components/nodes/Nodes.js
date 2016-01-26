import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';
import when from 'when';
import { Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import IronicApiErrorHandler from '../../services/IronicApiErrorHandler';
import IronicApiService from '../../services/IronicApiService';
import MistralApiService from '../../services/MistralApiService';
import MistralApiErrorHandler from '../../services/MistralApiErrorHandler';
import NavTab from '../ui/NavTab';
import NodesActions from '../../actions/NodesActions';
import NotificationActions from '../../actions/NotificationActions';

class Nodes extends React.Component {
  componentDidMount() {
    this.fetchNodes();
  }

  introspectNodes() {
    this.props.dispatch(NodesActions.startOperation());
    MistralApiService.runWorkflow('tripleo.baremetal.bulk_introspect').then((response) => {
      if(response.state === 'ERROR') {
        NotificationActions.notify({ title: 'Error', message: response.state_info });
        this.props.dispatch(NodesActions.finishOperation);
      } else {
        this.pollForWorkflow(response.id);
      }
    }).catch((error) => {
      let errorHandler = new MistralApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
      this.props.dispatch(NodesActions.finishOperation());
    });
  }

  pollForWorkflow(id) {
    MistralApiService.getWorkflowExecution(id).then((response) => {
      if(response.state === 'RUNNING') {
        this.fetchNodes();
        setTimeout(() => this.pollForWorkflow(id), 7000);
      } else if(response.state === 'ERROR') {
        NotificationActions.notify({ title: 'Error', message: response.state_info });
        this.props.dispatch(NodesActions.finishOperation());
      } else {
        this.props.dispatch(NodesActions.finishOperation());
      }
    }).catch((error) => {
      let errorHandler = new MistralApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
      this.props.dispatch(NodesActions.finishOperation());
    });
  }

  fetchNodes() {
    IronicApiService.getNodes().then((response) => {
      return when.all(response.nodes.map((node) => {
        return IronicApiService.getNode(node.uuid);
      }));
    }).then((nodes) => {
      this.props.dispatch(NodesActions.listNodes(nodes));
    }).catch((error) => {
      console.error('Error in Nodes.fetchNodes', error); //eslint-disable-line no-console
      let errorHandler = new IronicApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  refreshResults(e) {
    e.preventDefault();
    this.fetchNodes();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="page-header">
            <div className="pull-right">
              <a href="" onClick={this.refreshResults.bind(this)}>
                <span className="pficon pficon-refresh"></span> Refresh Results
              </a>
              &nbsp;
              <Link to="/nodes/registered/register"
                    className="btn btn-primary">
                <span className="fa fa-plus"/> Register Nodes
              </Link>
            </div>
            <h1>Nodes</h1>
          </div>
          <ul className="nav nav-tabs">
            <NavTab to="/nodes/registered">
              Registered<span className="badge">{this.props.nodes.get('registered').size}</span>
            </NavTab>
            <NavTab to="/nodes/introspected">
              Introspected<span className="badge">{this.props.nodes.get('introspected').size}</span>
            </NavTab>
            <NavTab to="/nodes/provisioned">
              Provisioned<span className="badge">{this.props.nodes.get('provisioned').size}</span>
            </NavTab>
            <NavTab to="/nodes/maintenance">
              Maintenance<span className="badge">{this.props.nodes.get('maintenance').size}</span>
            </NavTab>
          </ul>
          <div className="tab-pane">
            {React.cloneElement(this.props.children,
                                { nodes: this.props.nodes,
                                  introspectNodes: this.introspectNodes.bind(this) })}
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
              <p>To create Flavors run</p>
              <pre>tripleo.sh --flavors</pre>
              <p>To list Flavors run</p>
              <pre>tripleo.sh --flavors</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Nodes.propTypes = {
  children: React.PropTypes.node.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  nodes: ImmutablePropTypes.map.isRequired
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps(state) {
  return {
    nodes: state.nodes.merge(
      Map({
        registered: state.nodes.get('all').filter( node => node.provision_state === 'available' &&
                                                   !node.provision_updated_at ||
                                                   node.provision_state === 'manageable' ),
        introspected: state.nodes.get('all').filter( node => node.provision_state === 'available' &&
                                                   !!node.provision_updated_at ),
        provisioned: state.nodes.get('all').filter( node => node.instance_uuid ),
        maintenance: state.nodes.get('all').filter( node => node.maintenance )
      })
    )
  };
}

export default connect(mapStateToProps)(Nodes);
