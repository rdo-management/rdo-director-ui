import request from 'reqwest';
import when from 'when';

import { AUTH_URL } from '../constants/KeystoneApiConstants';
import LoginActions from '../actions/LoginActions';

class KeystoneApiService {
  authenticateUser(username, password) {
    return this.handleAuth(when(request({
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
    })));
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
    }).catch((err) => {
      // TODO(jtomasek): launch notification action/form errors based on error.code etc.
      console.log('Error in handleAuth', err);
    });
  }
}

export default new KeystoneApiService();
