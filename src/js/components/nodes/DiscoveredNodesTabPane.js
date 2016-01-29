import React from 'react';

import NodesTable from './NodesTable';

export default class DiscoveredNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.get('discovered')}/>
    );
  }
}
DiscoveredNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
