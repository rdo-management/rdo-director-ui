import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AuthTokenStorage from '../services/AuthTokenStorage.js';
import KeystoneApiService from '../services/KeystoneApiService';
import LoginConstants from '../constants/LoginConstants';

export default {
  authenticateUserViaToken(keystoneAuthTokenId) {
    KeystoneApiService.authenticateUserViaToken(keystoneAuthTokenId);
  },

  loginUser(keystoneAccess) {
    AuthTokenStorage.storeTokenId(keystoneAccess.token.id);
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: keystoneAccess
    });
  },

  logoutUser() {
    AuthTokenStorage.removeTokenId();
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT_USER
    });
  }
};
