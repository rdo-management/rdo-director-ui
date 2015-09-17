const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const KeystoneApiService = require('../../js/services/KeystoneApiService');
const LoginActions = require('../../js/actions/LoginActions');
const LoginConstants = require('../../js/constants/LoginConstants');

let mockKeystoneAccess = {
  token: {
    id: 'someTokenIdString'
  },
  user: 'admin',
  serviceCatalog: 'service catalog',
  metadata: 'some metadata'
};

// Create an empty global `localStorage` variable.
/*global localStorage:true*/
localStorage = {};

describe('LoginActions', () => {
  it('creates action to authenticate user via keystone token', () => {
    spyOn(KeystoneApiService, 'authenticateUserViaToken');
    LoginActions.authenticateUserViaToken('someTokenIdString');
    expect(KeystoneApiService.authenticateUserViaToken).toHaveBeenCalledWith('someTokenIdString');
  });

  it('creates action to login user with keystoneAccess response', () => {
    spyOn(localStorage, 'setItem');
    spyOn(AppDispatcher, 'dispatch');
    LoginActions.loginUser(mockKeystoneAccess);
    expect(localStorage.setItem).toHaveBeenCalledWith('keystoneAuthTokenId', mockKeystoneAccess.token.id);
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: mockKeystoneAccess
    });
  });

  it('creates action to logout user', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(AppDispatcher, 'dispatch');
    LoginActions.logoutUser();
    expect(localStorage.removeItem).toHaveBeenCalledWith('keystoneAuthTokenId');
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: LoginConstants.LOGOUT_USER
    });
  });
});
