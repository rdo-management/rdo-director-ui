var data = [
  {
    name: 'Baremetal',
    hw_specs: '1CPU, 40GB RAM, HDD 500GB',
    roles: [
      {
        name: 'Controller',
        color: '#00aaff',
        nodes_count: 2
      },
      {
        name: 'Compute',
        color: '#ffca28',
        nodes_count: 0
      },
    ]
  },
  {
    name: 'Flavor2',
    hw_specs: '1CPU, 20GB RAM, HDD 250GB',
    roles: []
  }
];

var BoxesApp = React.createClass({displayName: "BoxesApp",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(PageHeader, {text: "Overcloud Deployment"}), 
        React.createElement(FlavorPanelList, {data: data}), 
        React.createElement(NodeStack, {node_count: 6})
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
            React.createElement("i", {className: "subheader"}, " ", this.props.flavor.hw_specs)
          )
        ), 
        React.createElement("div", {className: "panel-body"}, 
          React.createElement(RoleList, {roles: this.props.flavor.roles})
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
      React.createElement("div", {className: "panel panel-default role-panel", style: {backgroundColor: this.props.role.color}}, 
        React.createElement("div", {className: "panel-body"}, 
          this.props.role.name
        )
      )
    );
  }
});

var NodeStack = React.createClass({displayName: "NodeStack",
  render: function() {
    var node_count = this.props.node_count;

    if(node_count <= 1) {
      return (
        React.createElement("div", {className: "node-stack-1"}, node_count)
      );
    } else {
      return (
        React.createElement("div", null, 
          React.createElement("button", {className: "btn btn-default btn-sm"}, 
            React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"})
          ), 
          React.createElement("div", {className: "node-stack-3"}, node_count), 
          React.createElement("button", {className: "btn btn-sm"}, 
            React.createElement("span", {className: "glyphicon glyphicon-chevron-right", "aria-hidden": "true"})
          ), 
          React.createElement("span", null, node_count, " Nodes")
        )
      );
    }
  }
});

React.render(React.createElement(BoxesApp, null), document.body);
