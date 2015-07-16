var Fluxxor = require('fluxxor');
var Flavors = require('../data/Flavors');

var FlavorStore = Fluxxor.createStore({
  actions: {
    "CHANGE_NODE_COUNT": "onNodeCountChange"
  },

  initialize: function(options) {
    this.state = {
      Flavors
    };
  },

  onNodeCountChange: function(payload) {
    this.state.Flavors[0].roles[0].nodeCount = payload.newCount;
    this.state.Flavors[0].freeNodeCount = 20 - payload.newCount;
    this.emit("change");
  },

  getState: function() {
    return this.state;
  }
});

module.exports = FlavorStore;
