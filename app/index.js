require('babel/polyfill');

var React = require('react');
var Fluxxor = require('fluxxor');

var Boxes = require('./components/Boxes');
var Actions = require('./actions/Actions');
var FlavorStore = require('./stores/FlavorStore');

var stores = {
  FlavorStore: new FlavorStore()
};

var flux = new Fluxxor.Flux(stores, Actions);

React.render(<Boxes flux={flux} />, document.body);
