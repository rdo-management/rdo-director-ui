import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  updateRole(roleName, newCount) {
    AppDispatcher.dispatch({
      actionType: "CHANGE_NODE_COUNT",
      roleData: { roleName: roleName, newCount: newCount }
    });
  },
}
