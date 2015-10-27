import React from 'react';

import IronicApiService from '../../services/IronicApiService';
import NodesTable from './NodesTable';

export default class RegisteredNodesTabPane extends React.Component {
  componentDidMount() {
    IronicApiService.getNodes();
  }

  render() {
    return (
      <NodesTable data={this.props.nodes.registered}/>
    );
  }
}
RegisteredNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
