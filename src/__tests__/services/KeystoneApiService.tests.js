jest.autoMockOff();

jest.mock('../../js/actions/LoginActions');

const KeystoneApiService = require('../../js/services/KeystoneApiService');
const LoginActions = require('../../js/actions/LoginActions');
const when = require('when');

describe('KeystoneApiService', () => {
  it('logs user in when response is received', () => {
    let mockApiRequestResponse = {
      access: {
        token: 'someToken',
        user: 'admin',
        serviceCatalog: 'service catalog',
        metadata: 'some metadata'
      }
    };
    KeystoneApiService.handleAuth(when(mockApiRequestResponse));
    jest.runAllTicks();
    expect(LoginActions.loginUser).toBeCalledWith(mockApiRequestResponse.access);
  });

  it('fails when request response is error', () => {
    console.log = jest.genMockFunction();
    let expectedError = new Error('I threw some error');
    let wrongApiRequest = jest.genMockFunction().mockImplementation(() => {
      return when.reject(expectedError);
    });
    KeystoneApiService.handleAuth(when(wrongApiRequest()));
    jest.runAllTicks();
    expect(console.log).toBeCalledWith('Error in handleAuth', expectedError);
  });
});
