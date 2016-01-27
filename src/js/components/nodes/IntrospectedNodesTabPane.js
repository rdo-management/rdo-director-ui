import React from 'react';

import NodesTable from './NodesTable';

export default class IntrospectedNodesTabPane extends React.Component {
  render() {
    return (
      <NodesTable data={this.props.nodes.introspected}/>
    );
  }
}
IntrospectedNodesTabPane.propTypes = {
  nodes: React.PropTypes.object
};
