var data = [
  {
    name: 'Baremetal',
    hwSpecs: '1CPU, 40GB RAM, HDD 500GB',
    roles: [
      {
        name: 'Controller',
        nodeCount: 2
      },
      {
        name: 'Compute',
        nodeCount: 0
      },
    ],
    freenodeCount: 20
  },
  {
    name: 'Flavor2',
    hwSpecs: '1CPU, 20GB RAM, HDD 250GB',
    roles: [],
    freenodeCount: 10
  }
];

var BoxesApp = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <PageHeader text="Overcloud Deployment"/>
          <FlavorPanelList data={data}/>
          <NodePicker nodeCount={6}/>
          <NodeStack nodeCount={6}/>
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

var FlavorPanelList = React.createClass({
  render: function() {
    var flavors = this.props.data.map(function(flavor, index) {
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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            <strong>{this.props.flavor.name}</strong>
            <small className='subheader'> {this.props.flavor.hwSpecs}</small>
          </h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-9">
              <RoleList roles={this.props.flavor.roles}/>
            </div>
            <div className="col-sm-3">
              <NodeStack nodeCount={this.props.flavor.freenodeCount}/>
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
        <RolePanel role={role} key={index}/>
      );
    });
    return (
      <div>
        {roles}
      </div>
    );
  }
});

var RolePanel = React.createClass({
  render: function() {
    return (
      <div className={"panel panel-default role-panel " + this.props.role.name.toLowerCase()}>
        <div className="panel-body">
          {this.props.role.name}
          <div className="pull-right">
            <NodePicker nodeCount={this.props.role.nodeCount}/>
          </div>
        </div>
      </div>
    );
  }
});

var NodePicker = React.createClass({
  getInitialState: function() {
    return {nodeCount: this.props.nodeCount};
  },
  updateCount: function(increment) {
    this.setState({nodeCount: this.state.nodeCount + increment});
  },
  render: function() {
    return (
      <div className="node-selector">
        <PickerArrow direction="left" increment={this.updateCount.bind(this, -1)}/>
        <NodeStack nodeCount={this.state.nodeCount}/>
        <PickerArrow direction="right" increment={this.updateCount.bind(this, 1)}/>
      </div>
    );
  }
});

var NodeStack = React.createClass({
  render: function() {
    return (
      <div className="node-stack-3">{this.props.nodeCount}</div>
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

React.render(<BoxesApp/>, document.body);
