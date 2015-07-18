var React = require('react');
var ClassNames = require('classnames');

var NodeStack = React.createClass({
  propTypes: {
    count: React.PropTypes.number.isRequired
  },

  render: function() {
    var classes = ClassNames({
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
});

module.exports = NodeStack;
