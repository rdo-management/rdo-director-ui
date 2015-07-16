var React = require('react');
var Fluxxor = require('fluxxor');
var classNames = require('classnames');
var Flavors = require('../data/Flavors');
var Roles = require('../data/Roles');

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Boxes = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('FlavorStore')],

  // getInitialState: function() {
  //   return {data: []};
  // },

  getStateFromFlux: function() {
    var state = {
      flavors: this.getFlux().store('FlavorStore').getState()
    };
    return state;
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <PageHeader text="Overcloud Deployment"/>
          <FlavorPanelList flavors={this.state.flavors.Flavors}/>
        </div>
      </div>
    );
  }
});

var PageHeader = React.createClass({
  render: function() {
    return (
      <div className="page-header">
        <h1>{this.props.text}</h1>
      </div>
    );
  }
});

// var FreeRolesList = React.createClass({
//   render: function() {
//     var freeRoles = this.props.data.filter(function(role, index) {
//       return role;
//     });
//     return (
//       <div className="row">
//         <RoleList roles={freeRoles}/>
//       </div>
//     );
//   }
// });

var FlavorPanelList = React.createClass({
  render: function() {
    var flavors = this.props.flavors.map(function(flavor, index) {
      return (
        <FlavorPanel flavor={flavor} key={index}/>
      );
    });
    return (
      <div>
        {flavors}
      </div>
    );
  }
});

var FlavorPanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default flavor-panel">
        <div className="panel-heading">
          <h3 className="panel-title">
            <strong>{this.props.flavor.name}</strong>
            <small className='subheader'> {this.props.flavor.hwSpecs}</small>
          </h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <FreeNodesPanel nodeCount={this.props.flavor.freeNodeCount} />
            </div>
            <RoleList roles={this.props.flavor.roles}/>
            <div className="col-sm-4 col-md-3">
              <DropZonePanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var RoleList = React.createClass({
  render: function() {
    var roles = this.props.roles.map(function(role, index) {
      return (
        <div className="col-sm-4 col-md-3" key={index}>
          <RolePanel role={role}/>
        </div>
      );
    });
    return (
      <div>
        {roles}
      </div>
    );
  }
});

var FreeNodesPanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default role-panel free-nodes-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Free Nodes</h3>
        </div>
        <div className="panel-body clearfix">
          <NodeStack nodeCount={this.props.nodeCount}/>
        </div>
      </div>
    );
  }
});

var DropZonePanel = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default role-panel drop-zone-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Add Role</h3>
        </div>
        <div className="panel-body clearfix">
          <span className="glyphicon glyphicon-plus"></span>
        </div>
      </div>
    );
  }
});

var RolePanel = React.createClass({
  render: function() {
    return (
      <div className={"panel panel-default role-panel " + this.props.role.name.toLowerCase()}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.role.name}</h3>
        </div>
        <div className="panel-body clearfix">
          <NodePicker nodeCount={this.props.role.nodeCount} roleName={this.props.role.name}/>
        </div>
      </div>
    );
  }
});

var NodePicker = React.createClass({
  mixins: [FluxMixin],

  updateCount: function(increment) {
    this.getFlux().actions.updateRole(this.props.roleName, this.props.nodeCount + increment);
  },

  render: function() {
    return (
      <div className="node-selector">
        <PickerArrow direction="left" increment={this.updateCount.bind(this, -1)}/>
        <NodeStack nodeCount={this.props.nodeCount}/>
        <PickerArrow direction="right" increment={this.updateCount.bind(this, 1)}/>
      </div>
    );
  }
});

var NodeStack = React.createClass({
  render: function() {
    var classes = classNames({
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

var PickerArrow = React.createClass({
  render: function() {
    return (
      <button className="picker-arrow" onClick={this.props.increment}>
        <span className={"glyphicon glyphicon-chevron-"+this.props.direction} aria-hidden="true"></span>
      </button>
    );
  }
});

module.exports = Boxes;
