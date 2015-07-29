var Actions = {
  updateRole: function(roleName, newCount) {
    this.dispatch("CHANGE_NODE_COUNT", {roleName: roleName, newCount: newCount});
  },
};

module.exports = Actions;
