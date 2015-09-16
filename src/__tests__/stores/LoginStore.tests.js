// jest.autoMockOff();

// jest.mock('../../js/dispatchers/AppDispatcher');

const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const LoginStore = require('../../js/stores/LoginStore');
const LoginConstants = require('../../js/constants/LoginConstants');

let callback;

let loggedInState = {
  token: 'token',
  user: 'admin',
  serviceCatalog: 'service catalog',
  metadata: 'some metadata'
};

// mock actions
let loginUserAction = {
  actionType: LoginConstants.LOGIN_USER,
  keystoneAccess: loggedInState
};

let logoutUserAction = {
  actionType: LoginConstants.LOGOUT_USER
};

describe('LoginStore', () => {
  beforeEach(() => {
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  xit('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  xit('sets state to keystoneAccess data when user logs in', () => {
    // LoginStore.emitChange = jest.genMockFunction();
    callback(loginUserAction);
    expect(LoginStore.state).toEqual({
      token: 'token',
      user: 'admin',
      serviceCatalog: 'service catalog',
      metadata: 'some metadata'
    });
    expect(LoginStore.emitChange).toBeCalled();
  });

  xit('cleans the state when user logs out', () => {
    // LoginStore.emitChange = jest.genMockFunction();
    callback(logoutUserAction);
    expect(LoginStore.state).toEqual({});
    expect(LoginStore.emitChange).toBeCalled();
  });

  xit('returns state with getState', () => {
    LoginStore.state = loggedInState;
    expect(LoginStore.getState()).toEqual(loggedInState);
  });

  xit('provides function to determine if user is logged in', () => {
    LoginStore.state = loggedInState;
    expect(LoginStore.isLoggedIn()).toEqual(true);
  });
});
