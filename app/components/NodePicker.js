var React = require('react');
var NodeStack = require('./NodeStack')

var NodePicker = React.createClass({
  /*
    Component that implements Node Count Picker expects onIncrement function
    (that expects increment parameter) passed through props from owner.
  */

  propTypes: {
    onIncrement: React.PropTypes.func.isRequired,
    nodeCount: React.PropTypes.number.isRequired,
    incrementValue: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      incrementValue: 1
    }
  },

  increment: function(increment) {
    this.props.onIncrement(increment);
  },

  render: function() {
    return (
      <div className="node-picker">
        <PickerArrow direction="left" increment={this.increment.bind(this, -this.props.incrementValue)}/>
        <NodeStack count={this.props.nodeCount}/>
        <PickerArrow direction="right" increment={this.increment.bind(this, this.props.incrementValue)}/>
      </div>
    );
  }
});

var PickerArrow = React.createClass({
  propTypes: {
    increment: React.PropTypes.func.isRequired,
    direction: React.PropTypes.oneOf(['left', 'right']).isRequired
  },

  render: function() {
    return (
      <button className="picker-arrow" onClick={this.props.increment}>
        <span className={"glyphicon glyphicon-chevron-"+this.props.direction} aria-hidden="true"></span>
      </button>
    );
  }
});

module.exports = NodePicker;
