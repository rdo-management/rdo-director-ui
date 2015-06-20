var BoxesApp = React.createClass({displayName: "BoxesApp",
  render: function() {
    return (
      React.createElement(PageHeader, {text: "Overcloud Deployment"})
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

React.render(React.createElement(BoxesApp, null), document.body);
