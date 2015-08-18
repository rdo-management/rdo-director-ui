import AppDispatcher from '../dispatchers/AppDispatcher.js';
import KeystoneApiService from '../services/KeystoneApiService';

export default {
  authenticateUser(username, password) {
    AppDispatcher.dispatch({
      actionType: 'USER_AUTH_STARTED'
    });
    KeystoneApiService.authenticateUser(username, password);
  },

  authenticateUserViaToken(keystoneAuthTokenId) {
    KeystoneApiService.authenticateUserViaToken(keystoneAuthTokenId);
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
