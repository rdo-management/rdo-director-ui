const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const KeystoneApiService = require('../../js/services/KeystoneApiService');
const LoginActions = require('../../js/actions/LoginActions');
const LoginConstants = require('../../js/constants/LoginConstants');
const AuthTokenStorage = require('../../js/services/AuthTokenStorage.js');

let mockKeystoneAccess = {
  token: {
    id: 'someTokenIdString'
  },
  user: 'admin',
  serviceCatalog: 'service catalog',
  metadata: 'some metadata'
};

describe('LoginActions', () => {
  it('creates action to authenticate user via keystone token', () => {
    spyOn(KeystoneApiService, 'authenticateUserViaToken');
    LoginActions.authenticateUserViaToken('someTokenIdString');
    expect(KeystoneApiService.authenticateUserViaToken).toHaveBeenCalledWith('someTokenIdString');
  });

  it('creates action to login user with keystoneAccess response', () => {
    spyOn(AuthTokenStorage, 'storeTokenId');
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    LoginActions.loginUser(mockKeystoneAccess);
    expect(AuthTokenStorage.storeTokenId).toHaveBeenCalledWith(mockKeystoneAccess.token.id);
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: mockKeystoneAccess
    });
  });

  it('creates action to logout user', () => {
    spyOn(AuthTokenStorage, 'removeTokenId');
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    LoginActions.logoutUser();
    expect(AuthTokenStorage.removeTokenId).toHaveBeenCalled();
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: LoginConstants.LOGOUT_USER
    });
  });
});
