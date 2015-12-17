import AppDispatcher from '../dispatchers/AppDispatcher.js';
import TempStorage from '../services/TempStorage.js';
import KeystoneApiErrorHandler from '../services/KeystoneApiErrorHandler';
import KeystoneApiService from '../services/KeystoneApiService';
import LoginConstants from '../constants/LoginConstants';
import NotificationActions from './NotificationActions';

export default {
  authenticateUserViaToken(keystoneAuthTokenId) {
    KeystoneApiService.authenticateUserViaToken(keystoneAuthTokenId).then((response) => {
      let keystoneAccess = response.access;
      this.loginUser(keystoneAccess);
      return true;
    }).catch((error) => {
      console.error('Error in LoginActions.authenticateUserViaToken', error); //eslint-disable-line no-console
      let errorHandler = new KeystoneApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  },

  loginUser(keystoneAccess) {
    TempStorage.setItem('keystoneAuthTokenId', keystoneAccess.token.id);
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: keystoneAccess
    });
  },

  logoutUser() {
    TempStorage.removeItem('keystoneAuthTokenId');
    AppDispatcher.dispatch({
      actionType: LoginConstants.LOGOUT_USER
    });
  }
};
