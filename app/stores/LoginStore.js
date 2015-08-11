import BaseStore from './BaseStore';

class LoginStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    // this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
    this.state = {
      user: null,
      jwt: null
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case 'USER_AUTH_STARTED':
      break;
    case 'LOGIN_USER':
      this.onLoginUser();
      break;
    case 'LOGOUT_USER':
      this.onLogoutUser();
      break;
    default:
      break;
    }
  }

  onLoginUser() {
    this.emitChange();
  }

  onLogoutUser() {
    this.state = {
      user: null,
      jwt: null
    };
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
