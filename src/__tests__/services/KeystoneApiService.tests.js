jest.autoMockOff();

jest.mock('../../js/actions/LoginActions');
// jest.mock('reqwest');

const KeystoneApiService = require('../../js/services/KeystoneApiService');
const LoginActions = require('../../js/actions/LoginActions');
// const request = require('reqwest');
const when = require('when');


describe('KeystoneApiService', () => {
  it('sends ajax request to authenticate User via username and password', () => {});
  it('sends ajax request to authenticate user via Keystone token', () => {});
  it('logs user in when response is received', () => {
    let mockPromiseResponse = {
      access: {
        token: 'someToken',
        user: 'admin',
        serviceCatalog: 'service catalog',
        metadata: 'some metadata'
      }
    };
    KeystoneApiService.handleAuth(when(mockPromiseResponse));
    jest.runAllTicks();
    expect(LoginActions.loginUser).toBeCalledWith(mockPromiseResponse.access);
  });

  // it('fails when request response is wrong', () => {
  //   console.log = jest.genMockFunction();
  //   KeystoneApiService.handleAuth(when(request({
  //     url: 'somewrongurl'
  //   })));
  //   jest.runAllTicks();
  //   expect(console.log).toBeCalled();
  // });
});
