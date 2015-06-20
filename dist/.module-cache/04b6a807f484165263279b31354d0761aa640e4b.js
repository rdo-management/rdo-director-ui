var data = [
  {
    name: 'Baremetal',
    hwSpecs: '1CPU, 40GB RAM, HDD 500GB',
    roles: [
      {
        name: 'Controller',
        color: '#d98d30',
        nodesCount: 2
      },
      {
        name: 'Compute',
        color: '#a6442e',
        nodesCount: 0
      },
    ],
    freeNodesCount: 20
  },
  {
    name: 'Flavor2',
    hwSpecs: '1CPU, 20GB RAM, HDD 250GB',
    roles: [],
    freeNodesCount: 10
  }
];

var BoxesApp = React.createClass({displayName: "BoxesApp",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(PageHeader, {text: "Overcloud Deployment"}), 
        React.createElement(FlavorPanelList, {data: data}), 
        React.createElement(NodeStack, {nodeCount: 6, title: "Free"})
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
            React.createElement("div", {className: "col-sm-6"}, 
              React.createElement(RoleList, {roles: this.props.flavor.roles})
            ), 
            React.createElement("div", {className: "col-sm-6"}, 
              React.createElement(NodeStack, {nodeCount: this.props.flavor.freeNodesCount, title: "Free"})
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
    var nodeCount = this.props.nodeCount;

    if(nodeCount <= 1) {
      return (
        React.createElement("div", {className: "node-stack-1"}, nodeCount)
      );
    } else {
      return (
        React.createElement("div", {className: "node-box"}, 
          React.createElement("div", {className: "node-selector"}, 
            React.createElement("button", {className: "btn btn-default btn-sm"}, 
              React.createElement("span", {className: "glyphicon glyphicon-chevron-left", "aria-hidden": "true"})
            ), 
            React.createElement("div", {className: "node-stack-3"}, this.props.title), 
            React.createElement("button", {className: "btn btn-default btn-sm"}, 
              React.createElement("span", {className: "glyphicon glyphicon-chevron-right", "aria-hidden": "true"})
            )
          ), 
          React.createElement("div", {className: "node-count"}, nodeCount, " Nodes")
        )
      );
    }
  }
});

React.render(React.createElement(BoxesApp, null), document.body);
