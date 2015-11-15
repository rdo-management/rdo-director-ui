import React from 'react';

import NodesTable from './NodesTable';

export default class RegisteredNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.registered}/>
    );
  }
}
RegisteredNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
