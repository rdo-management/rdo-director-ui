import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Loader from '../ui/Loader';
import NodesTable from './NodesTable';

export default class RegisteredNodesTabPane extends React.Component {
  getTableActions() {
    const operationInProgress = this.props.nodes.get('operationInProgress');
    return (
      <div>
        <Loader loaded={!operationInProgress}
                size="sm"
                inline/>
        <button className="btn btn-default"
                type="button"
                disabled={operationInProgress}
                onClick={e => {
                  e.preventDefault();
                  this.props.introspectNodes();
                }}>
          Introspect Nodes
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <NodesTable data={this.props.nodes.get('registered')}
                    tableActions={this.getTableActions.bind(this)}/>
        {this.props.children}
      </div>
    );
  }
}
RegisteredNodesTabPane.propTypes = {
  children: React.PropTypes.node,
  introspectNodes: React.PropTypes.func,
  nodes: ImmutablePropTypes.map
};
