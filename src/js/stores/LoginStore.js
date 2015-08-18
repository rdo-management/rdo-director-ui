import BaseStore from './BaseStore';

class LoginStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {};
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case 'USER_AUTH_STARTED':
      break;
    case 'LOGIN_USER':
      this.onLoginUser(payload.keystoneAccess);
      break;
    case 'LOGOUT_USER':
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
