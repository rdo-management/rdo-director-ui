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

var BoxesApp = React.createClass({displayName: "BoxesApp",
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement(PageHeader, {text: "Overcloud Deployment"}), 
          React.createElement(FlavorPanelList, {data: data}), 
          React.createElement(NodePicker, {nodeCount: 6}), 
          React.createElement(NodeStack, {nodeCount: 6})
        )
      )
    );
  }
});

var PageHeader = React.createClass({displayName: "PageHeader",
  render: function() {
    return (
      React.createElement("div", {className: "page-header"}, 
        React.createElement("h1", null, this.props.text)
      )
    );
  }
});

var FlavorPanelList = React.createClass({displayName: "FlavorPanelList",
  render: function() {
    var flavors = this.props.data.map(function(flavor, index) {
      return (
        React.createElement(FlavorPanel, {flavor: flavor, key: index})
      );
    });
    return (
      React.createElement("div", null, 
        flavors
      )
    );
  }
});

var FlavorPanel = React.createClass({displayName: "FlavorPanel",
  render: function() {
    return (
      React.createElement("div", {className: "panel panel-default"}, 
        React.createElement("div", {className: "panel-heading"}, 
          React.createElement("h3", {className: "panel-title"}, 
            React.createElement("strong", null, this.props.flavor.name), 
            React.createElement("small", {className: "subheader"}, " ", this.props.flavor.hwSpecs)
          )
        ), 
        React.createElement("div", {className: "panel-body"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-sm-9"}, 
              React.createElement(RoleList, {roles: this.props.flavor.roles})
            ), 
            React.createElement("div", {className: "col-sm-3"}, 
              React.createElement(NodeStack, {nodeCount: this.props.flavor.freenodeCount})
            )
          )
        )
      )
    );
  }
});

var RoleList = React.createClass({displayName: "RoleList",
  render: function() {
    var roles = this.props.roles.map(function(role, index) {
      return (
        React.createElement(RolePanel, {role: role, key: index})
      );
    });
    return (
      React.createElement("div", null, 
        roles
      )
    );
  }
});

var RolePanel = React.createClass({displayName: "RolePanel",
  render: function() {
    return (
      React.createElement("div", {className: "panel panel-default role-panel " + this.props.role.name.toLowerCase()}, 
        React.createElement("div", {className: "panel-body"}, 
          this.props.role.name, 
          React.createElement("div", {className: "pull-right"}, 
            React.createElement(NodePicker, {nodeCount: this.props.role.nodeCount})
          )
        )
      )
    );
  }
});

var NodePicker = React.createClass({displayName: "NodePicker",
  getInitialState: function() {
    return {nodeCount: this.props.nodeCount};
  },
  componentDidMount: function() {
  },
  increaseCount: function() {
    this.setState({nodeCount: this.state.nodeCount++});
  },
  render: function() {
    return (
      React.createElement("div", {className: "node-selector"}, 
        React.createElement("button", {className: "picker-arrow"}, 
          React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"})
        ), 
        React.createElement(NodeStack, {nodeCount: this.state.nodeCount}), 
        React.createElement("button", {className: "picker-arrow", onClick: this.increaseCount}, 
          React.createElement("span", {className: "glyphicon glyphicon-chevron-right", "aria-hidden": "true"})
        )
      )
    );
  }
});

var NodeStack = React.createClass({displayName: "NodeStack",
  render: function() {
    return (
      React.createElement("div", {className: "node-stack-3"}, this.props.nodeCount)
    );
  }
});

React.render(React.createElement(BoxesApp, null), document.body);
