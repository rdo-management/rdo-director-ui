import React from 'react';
import ClassNames from 'classnames';

export default class NodeStack extends React.Component {
  render() {
    let classes = ClassNames({
      'stack': true,
      'single-stack': this.props.count == 2,
      'double-stack': this.props.count > 2
    });
    return (
      <div className="node-stack">
        <div className={classes}>{this.props.count}</div>
      </div>
    );
  }
}
NodeStack.propTypes = {
  count: React.PropTypes.number.isRequired
};

