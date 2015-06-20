var data = [
  {
    name: 'Baremetal',
    hw_specs: '1CPU, 40GB RAM, HDD 500GB',
    roles: [
      {
        name: 'Controller',
        nodes_count: 2
      },
      {
        name: 'Compute',
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
            this.props.flavor.name, 
            React.createElement("i", {className: "subheader"}, this.props.flavor.hw_specs)
          )
        ), 
        React.createElement("div", {className: "panel-body"}, 
          "Panel content"
        )
      )
    );
  }
});

React.render(React.createElement(BoxesApp, null), document.body);
