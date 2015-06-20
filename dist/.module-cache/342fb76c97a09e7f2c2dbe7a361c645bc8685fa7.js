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
        React.createElement(FlavorPanelList, {data: data})
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
        React.createElement(RolePanel, {role: role})
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
      React.createElement("div", {className: "panel panel-default role-panel", style: "background-color: {this.props.role.color}"}, 
        React.createElement("div", {className: "panel-body"}, 
          this.props.role.name
        )
      )
    );
  }
});

React.render(React.createElement(BoxesApp, null), document.body);
