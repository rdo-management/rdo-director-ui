import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AuthService from '../services/AuthService';

export default {
  authenticateUser(username, password) {
    AppDispatcher.dispatch({
      actionType: 'USER_AUTH_STARTED'
    });
    AuthService.authenticateUser(username, password);
  },

  loginUser(keystoneAccess) {
    localStorage.setItem('keystoneAccess', keystoneAccess);
    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      keystoneAccess: keystoneAccess
    });
  }
};
