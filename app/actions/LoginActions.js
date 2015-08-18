import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AuthService from '../services/AuthService';

export default {
  authenticateUser(username, password) {
    AppDispatcher.dispatch({
      actionType: 'USER_AUTH_STARTED'
    });
    AuthService.authenticateUser(username, password);
  },

  authenticateUserViaToken(keystoneAuthTokenId) {
    AuthService.authenticateUserViaToken(keystoneAuthTokenId);
  },

  loginUser(keystoneAccess) {
    sessionStorage.setItem('keystoneAuthTokenId', keystoneAccess.token.id);
    AppDispatcher.dispatch({
      actionType: 'LOGIN_USER',
      keystoneAccess: keystoneAccess
    });
  },

  logoutUser() {
    sessionStorage.removeItem('keystoneAuthTokenId');
    AppDispatcher.dispatch({
      actionType: 'LOGOUT_USER'
    });
  }
};
