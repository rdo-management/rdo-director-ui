import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import NodesTable from './NodesTable';

export default class RegisteredNodesTabPane extends React.Component {
  render() {
    return (
      <div>
        <NodesTable data={this.props.nodes.get('registered')}/>
        {this.props.children}
      </div>
    );
  }
}
RegisteredNodesTabPane.propTypes = {
  children: React.PropTypes.node,
  nodes: ImmutablePropTypes.map
};
