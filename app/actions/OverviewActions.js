import AppDispatcher from '../dispatchers/AppDispatcher.js';

export default {
  updateRole(role) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_FLAVOR_ROLE",
      role: role
    });
  },
}
