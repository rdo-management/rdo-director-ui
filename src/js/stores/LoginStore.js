import BaseStore from './BaseStore';
import LoginConstants from '../constants/LoginConstants';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {};
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case LoginConstants.USER_AUTH_STARTED:
      break;
    case LoginConstants.LOGIN_USER:
      this.onLoginUser(payload.keystoneAccess);
      break;
    case LoginConstants.LOGOUT_USER:
      this.onLogoutUser();
      break;
    default:
      break;
    }
  }

  onLoginUser(keystoneAccess) {
    this.state = {
      token: keystoneAccess.token,
      user: keystoneAccess.user,
      serviceCatalog: keystoneAccess.serviceCatalog,
      metadata: keystoneAccess.metadata
    };
    this.emitChange();
  }

  onLogoutUser() {
    this.state = {};
    this.emitChange();
  }

  getState() {
    return this.state;
  }

  isLoggedIn() {
    return !!this.state.user;
  }
}

export default new LoginStore();
