import AppDispatcher from '../dispatchers/AppDispatcher.js';
import KeystoneApiService from '../services/KeystoneApiService';
import LoginConstants from '../constants/LoginConstants';

export default {
  authenticateUserViaToken(keystoneAuthTokenId) {
    KeystoneApiService.authenticateUserViaToken(keystoneAuthTokenId);
  },

  loginUser(keystoneAccess) {
    localStorage.setItem('keystoneAuthTokenId', keystoneAccess.token.id);
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: keystoneAccess
    });
  },

  logoutUser() {
    localStorage.removeItem('keystoneAuthTokenId');
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT_USER
    });
  }
};
