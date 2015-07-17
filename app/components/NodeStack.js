var React = require('react');
var ClassNames = require('classnames');

var NodeStack = React.createClass({
  render: function() {
    var classes = ClassNames({
      'node-stack': true,
      'single-stack': this.props.nodeCount == 2,
      'double-stack': this.props.nodeCount > 2
    });
    return (
      <div className="stack-wrap">
        <div className={classes}>{this.props.nodeCount}</div>
      </div>
    );
  }
});

module.exports = NodeStack;
