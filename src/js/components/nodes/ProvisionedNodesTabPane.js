import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import NodesTable from './NodesTable';

export default class ProvisionedNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.get('provisioned')}
                  dataOperationInProgress={this.props.nodes.get('dataOperationInProgress')}/>
    );
  }
}
ProvisionedNodesTabPane.propTypes = {
  nodes: ImmutablePropTypes.map
};
