import request from 'reqwest';
import when from 'when';

import { AUTH_URL } from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {
  authenticateUser(username, password) {
    return this.handleAuth(when(request({
      url: AUTH_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        "auth": {
          "passwordCredentials": {
            "username": username,
            "password": password
          },
          "tenantName": "admin"
        }
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise.then(function(response) {
      var jwt = response;
      console.log(response);
      LoginActions.loginUser();
      return true;
    }).catch(function(err){
      console.log("Error in handleAuth", err);
    });
  }
}

export default new AuthService()
