const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const KeystoneApiService = require('../../js/services/KeystoneApiService');
const LoginActions = require('../../js/actions/LoginActions');
const LoginConstants = require('../../js/constants/LoginConstants');
const TempStorage = require('../../js/services/TempStorage.js');

let mockKeystoneAccess = {
  token: {
    id: 'someTokenIdString'
  },
  user: 'admin',
  serviceCatalog: 'service catalog',
  metadata: 'some metadata'
};

describe('LoginActions', () => {
  xit('creates action to authenticate user via keystone token', () => {
    spyOn(KeystoneApiService, 'authenticateUserViaToken');
    LoginActions.authenticateUserViaToken('someTokenIdString');
    expect(KeystoneApiService.authenticateUserViaToken).toHaveBeenCalledWith('someTokenIdString');
  });

  xit('creates action to login user with keystoneAccess response', () => {
    spyOn(TempStorage, 'setItem');
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    LoginActions.loginUser(mockKeystoneAccess);
    expect(TempStorage.setItem).toHaveBeenCalledWith(
      'keystoneAuthTokenId',
      mockKeystoneAccess.token.id
    );
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: LoginConstants.LOGIN_USER,
      keystoneAccess: mockKeystoneAccess
    });
  });

  xit('creates action to logout user', () => {
    spyOn(TempStorage, 'removeItem');
    LoginActions.logoutUser();
    expect(TempStorage.removeItem).toHaveBeenCalled();
  });
});
