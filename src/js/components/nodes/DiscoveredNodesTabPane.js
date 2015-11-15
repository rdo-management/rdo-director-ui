import React from 'react';

import IronicApiService from '../../services/IronicApiService';
import NodesTable from './NodesTable';

export default class DiscoveredNodesTabPane extends React.Component {
  componentDidMount() {
    IronicApiService.handleGetNodes();
  }

  render() {
    return (
      <NodesTable data={this.props.nodes.discovered}/>
    );
  }
}
DiscoveredNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
