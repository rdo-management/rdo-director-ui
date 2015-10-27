import React from 'react';

import IronicApiService from '../../services/IronicApiService';
import NodesTable from './NodesTable';

export default class ProvisionedNodesTabPane extends React.Component {
  componentDidMount() {
    IronicApiService.getNodes();
  }

  render() {
    return (
      <NodesTable data={this.props.nodes.provisioned}/>
    );
  }
}
ProvisionedNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
