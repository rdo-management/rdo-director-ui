import request from 'reqwest';
import when from 'when';

import { AUTH_URL } from '../constants/KeystoneApiConstants';
import KeystoneApiErrorHandler from './KeystoneApiErrorHandler';
import LoginActions from '../actions/LoginActions';
import NotificationActions from '../actions/NotificationActions';

class KeystoneApiService {
  authenticateUser(username, password) {
    return when(request({
      url: AUTH_URL,
      method: 'POST',
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json',
      data: JSON.stringify({
        auth: {
          tenantName: 'admin',
          passwordCredentials: {
            username: username,
            password: password
          }
        }
      })
    }));
  }

  authenticateUserViaToken(keystoneAuthTokenId) {
    return this.handleAuth(when(request({
      url: AUTH_URL,
      method: 'POST',
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json',
      data: JSON.stringify({
        auth: {
          tenantName: 'admin',
          token: {
            id: keystoneAuthTokenId
          }
        }
      })
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise.then((response) => {
      let keystoneAccess = response.access;
      LoginActions.loginUser(keystoneAccess);
      return true;
    }).catch((error) => {
      console.error('Error in handleAuth', error);
      let errorHandler = new KeystoneApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }
}

export default new KeystoneApiService();
