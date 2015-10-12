import React from 'react';

export default class DiscoveredNodesTabPane extends React.Component {
  render() {
    let nodes = this.props.nodes.map((node, index) => {
      return (
        <div key={index}>{node.uuid}</div>
      );
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
}
