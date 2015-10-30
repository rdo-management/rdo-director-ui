import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Login = require('../../js/components/Login');
const LoginActions = require('../../js/actions/LoginActions');
const LoginStore = require('../../js/stores/LoginStore');

let loginInstance;

let loggedInState = {
  token: '123123123',
  user: 'admin',
  serviceCatalog: 'some service catalog',
  metadata: 'some metadata'
};
let notLoggedInState = {};

describe('Login component', () => {
  describe('When user is not logged in', () => {
    beforeEach(() => {
      spyOn(LoginStore, 'getState').and.returnValue(notLoggedInState);
      spyOn(LoginStore, 'isLoggedIn').and.returnValue(false);
      loginInstance = TestUtils.renderIntoDocument(<Login/>);
    });

    it('should check for redirection prior to mounting', () => {
      spyOn(loginInstance, '_shouldRedirect').and.callThrough();
      loginInstance.componentWillMount();
      expect(loginInstance._shouldRedirect).toHaveBeenCalled();
    });

    it('should check if User is logged in when testing for redirection', () => {
      loginInstance._shouldRedirect();
      expect(LoginStore.isLoggedIn).toHaveBeenCalled();
    });

    it('should render with expected markup', () => {
      expect(TestUtils.isCompositeComponent(loginInstance)).toBeTruthy();

      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginInstance, 'input');
      expect(inputs.length).toBe(2);
      expect(inputs[0].id).toBe('username');
      expect(inputs[1].id).toBe('password');

      let submitButton = TestUtils.findRenderedDOMComponentWithTag(loginInstance, 'button');
      expect(submitButton.textContent).toBe('Submit');
      expect(submitButton.type).toBe('submit');
    });

    xit('updates the component state when user fills the form', function() {
      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginInstance, 'input');
      TestUtils.Simulate.change(inputs[0], { target: { value: 'myusername' }});
      TestUtils.Simulate.change(inputs[1], { target: { value: 'somepassword' }});
      expect(loginInstance.state.username).toEqual('myusername');
      expect(loginInstance.state.password).toEqual('somepassword');
    });

    xit('should handle the login when user submits the login form', () => {
      let loginForm = TestUtils.findRenderedDOMComponentWithTag(loginInstance, 'form');
      TestUtils.Simulate.submit(loginForm);
      expect(LoginActions.authenticateUser).toBeCalled();
    });
  });

  describe('When user is logged in', () => {
    beforeEach(() => {
      LoginStore.getState = LoginStore.getState.mockReturnValue(loggedInState);
      LoginStore.isLoggedIn = LoginStore.isLoggedIn.mockReturnValue(true);
    });
    xit('redirects to nextPath when user is logged in and visits login page', () => {
      loginInstance = new Login();
      loginInstance.context = {
        router: {
          getCurrentQuery() {
            return {
              nextPath: 'nodes'
            };
          }
        }
      };
      // loginInstance.context.router.transitionTo = jest.genMockFunction();
      loginInstance.componentWillMount();
      expect(loginInstance.context.router.transitionTo).toBeCalledWith('nodes');
    });
  });
});
