import React from 'react';

import NodesTable from './NodesTable';

export default class RegisteredNodesTabPane extends React.Component {
  render() {
    return (
      <div>
        <NodesTable data={this.props.nodes.registered}/>
        {this.props.children}
      </div>
    );
  }
}
RegisteredNodesTabPane.propTypes = {
  children: React.PropTypes.node,
  nodes: React.PropTypes.object
};
