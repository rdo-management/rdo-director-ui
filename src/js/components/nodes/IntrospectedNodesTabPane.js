import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import NodesTable from './NodesTable';

export default class IntrospectedNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.get('introspected')}/>
    );
  }
}
IntrospectedNodesTabPane.propTypes = {
  nodes: ImmutablePropTypes.map
};
