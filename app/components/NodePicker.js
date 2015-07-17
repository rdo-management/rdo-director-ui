var React = require('react');
var NodeStack = require('./NodeStack')

var NodePicker = React.createClass({
  /*
    Component that implements Node Count Picker expects onIncrement function
    (that expects increment parameter) passed through props from owner.
    TODO(jtomasek): catch this in exception/prop definition
    TODO(jtomasek): make increment number configurable via prop, default to 1/-1
  */

  increment: function(increment) {
    this.props.onIncrement(increment);
  },

  render: function() {
    return (
      <div className="node-selector">
        <PickerArrow direction="left" increment={this.increment.bind(this, -1)}/>
        <NodeStack nodeCount={this.props.nodeCount}/>
        <PickerArrow direction="right" increment={this.increment.bind(this, 1)}/>
      </div>
    );
  }
});

var PickerArrow = React.createClass({
  render: function() {
    return (
      <button className="picker-arrow" onClick={this.props.increment}>
        <span className={"glyphicon glyphicon-chevron-"+this.props.direction} aria-hidden="true"></span>
      </button>
    );
  }
});

module.exports = NodePicker;
