import React from 'react';

import NodesTable from './NodesTable';

export default class MaintenanceNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.get('maintenance')}/>
    );
  }
}
MaintenanceNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
