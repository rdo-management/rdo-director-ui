var BoxesApp = React.createClass({displayName: "BoxesApp",
  render: function() {
    return (
      React.createElement("h1", null, "Overcloud Deployment")
    );
  }
});

React.render(
  React.createElement(BoxesApp, null),
  document.body
);
