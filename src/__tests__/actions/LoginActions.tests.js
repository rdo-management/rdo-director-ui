jest.autoMockOff();

jest.mock('../../js/dispatchers/AppDispatcher');
jest.mock('../../js/services/KeystoneApiService');

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
  it('creates action to authenticate user via username and password', () => {
    LoginActions.authenticateUser('admin', 'somepassword');
    expect(KeystoneApiService.authenticateUser).toBeCalledWith('admin', 'somepassword');
  });

  it('creates action to authenticate user via keystone token', () => {
    LoginActions.authenticateUserViaToken('someTokenIdString');
    expect(KeystoneApiService.authenticateUserViaToken).toBeCalledWith('someTokenIdString');
  });

  it('creates action to login user with keystoneAccess response', () => {
    localStorage.setItem = jest.genMockFunction();
    LoginActions.loginUser(mockKeystoneAccess);
    expect(localStorage.setItem).toBeCalledWith('keystoneAuthTokenId', mockKeystoneAccess.token.id);
    expect(AppDispatcher.dispatch).toBeCalledWith({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: mockKeystoneAccess
    });
  });

  it('creates action to logout user', () => {
    localStorage.removeItem = jest.genMockFunction();
    LoginActions.logoutUser();
    expect(localStorage.removeItem).toBeCalledWith('keystoneAuthTokenId');
    expect(AppDispatcher.dispatch).toBeCalledWith({
      actionType: LoginConstants.LOGOUT_USER
    });
  });
});
