import React from 'react';

import RolesActions from '../../actions/RolesActions';
import FlavorStore from '../../stores/FlavorStore';
import NodePicker from './NodePicker';
import NodeStack from './NodeStack';

export default class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flavors: []
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this.setState(FlavorStore.getState());
    FlavorStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    FlavorStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(FlavorStore.getState());
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="page-header">
            <h1>Roles</h1>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h3>Hardware</h3>
              <FlavorPanelList flavors={this.state.flavors}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// export class FreeRolesList extends React.Component {
//   render() {
//     let freeRoles = this.props.data.filter((role, index) => {
//       return role;
//     });
//     return (
//       <div className="row">
//         <RoleList roles={freeRoles}/>
//       </div>
//     );
//   }
// }


export class FlavorPanelList extends React.Component {
  render() {
    let flavors = this.props.flavors.map((flavor, index) => {
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
}
FlavorPanelList.propTypes = {
  flavors: React.PropTypes.array.isRequired
};


export class FlavorPanel extends React.Component {
  render() {
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
}
FlavorPanel.propTypes = {
  flavor: React.PropTypes.object.isRequired
};


export class RoleList extends React.Component {
  render() {
    let roles = this.props.roles.map((role, index) => {
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
}
RoleList.propTypes = {
  roles: React.PropTypes.array.isRequired
};


export class FreeNodesPanel extends React.Component {
  render() {
    return (
      <div className="panel panel-default role-panel free-nodes-panel">
        <div className="panel-heading">
          <h3 className="panel-title">Available Nodes</h3>
        </div>
        <div className="panel-body clearfix">
          <NodeStack count={this.props.nodeCount} />
        </div>
      </div>
    );
  }
}
FreeNodesPanel.propTypes = {
  nodeCount: React.PropTypes.number.isRequired
};


export class DropZonePanel extends React.Component {
  render() {
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
}


export class RolePanel extends React.Component {
  updateCount(increment) {
    let updatedRole = this.props.role;
    updatedRole.nodeCount = this.props.role.nodeCount + increment;
    RolesActions.updateRole(updatedRole);
  }

  render() {
    return (
      <div className={'panel panel-default role-panel ' + this.props.role.name.toLowerCase()}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.role.name}</h3>
        </div>
        <div className="panel-body clearfix">
          <NodePicker nodeCount={this.props.role.nodeCount}
                      onIncrement={this.updateCount.bind(this)}/>
        </div>
      </div>
    );
  }
}
RolePanel.propTypes = {
  role: React.PropTypes.object.isRequired
};
