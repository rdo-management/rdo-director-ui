import React from 'react';

import IronicApiService from '../../services/IronicApiService';
import NodesTable from './NodesTable';

export default class MaintenanceNodesTabPane extends React.Component {
  componentDidMount() {
    IronicApiService.handleGetNodes();
  }

  render() {
    return (
      <NodesTable data={this.props.nodes.maintenance}/>
    );
  }
}
MaintenanceNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
