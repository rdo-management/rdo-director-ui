import React from 'react';

import NodesTable from './NodesTable';

export default class ProvisionedNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.provisioned}/>
    );
  }
}
ProvisionedNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
