import React from 'react';
import Fluxxor from 'fluxxor';

import Flavors from '../data/Flavors';
import Roles from '../data/Roles';
import NodePicker from './NodePicker';
import NodeStack from './NodeStack';

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
      <div className="row">
        <PageHeader text="Overcloud Deployment"/>
        <FlavorPanelList flavors={this.state.flavors.Flavors}/>
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
          <NodeStack count={this.props.nodeCount} />
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
  mixins: [FluxMixin],

  updateCount: function(increment) {
    this.getFlux().actions.updateRole(this.props.role.name, this.props.role.nodeCount + increment);
  },

  render: function() {
    return (
      <div className={"panel panel-default role-panel " + this.props.role.name.toLowerCase()}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.role.name}</h3>
        </div>
        <div className="panel-body clearfix">
          <NodePicker onIncrement={this.updateCount} nodeCount={this.props.role.nodeCount} />
        </div>
      </div>
    );
  }
});

module.exports = Boxes;
