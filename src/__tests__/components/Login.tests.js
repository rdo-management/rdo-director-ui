/* Disable Jest Auto mocking, as Login module uses 'import' which won't get
   automatically mocked (rather then 'require') */
// jest.autoMockOff();

// jest.mock('../../js/actions/LoginActions');
// jest.mock('../../js/stores/LoginStore');

const React = require('react/addons');
const Login = require('../../js/components/Login');
const LoginActions = require('../../js/actions/LoginActions');
const LoginStore = require('../../js/stores/LoginStore');
const TestUtils = React.addons.TestUtils;

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
      LoginStore.getState = LoginStore.getState.mockReturnValue(notLoggedInState);
      LoginStore.isLoggedIn = LoginStore.isLoggedIn.mockReturnValue(false);
      loginInstance = TestUtils.renderIntoDocument(<Login/>);
    });

    it('should check for redirection prior to mounting', () => {
      // loginInstance._shouldRedirect = jest.genMockFunction();
      loginInstance.componentWillMount();
      expect(loginInstance._shouldRedirect).toBeCalled();
    });

    it('should check if User is logged in when testing for redirection', () => {
      loginInstance._shouldRedirect();
      expect(LoginStore.isLoggedIn).toBeCalled();
    });

    it('should render with expected markup', () => {
      expect(TestUtils.isCompositeComponent(loginInstance)).toBeTruthy();

      let loginForm = TestUtils.findRenderedDOMComponentWithTag(loginInstance, 'form');
      expect(loginForm.props.onSubmit).toBeDefined();

      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginInstance, 'input');
      expect(inputs.length).toBe(2);
      expect(inputs[0].props.id).toBe('username');
      expect(inputs[1].props.id).toBe('password');
      // alternatively dom node can be tested:
      // expect(React.findDOMNode(inputs[0]).id).toBe('username');

      let submitButton = TestUtils.findRenderedDOMComponentWithTag(loginInstance, 'button');
      expect(submitButton.props.children).toBe('Submit');
      expect(submitButton.props.type).toBe('submit');
    });

    it('updates the component state when user fills the form', function() {
      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(loginInstance, 'input');
      TestUtils.Simulate.change(inputs[0], { target: { value: 'myusername' }});
      TestUtils.Simulate.change(inputs[1], { target: { value: 'somepassword' }});
      expect(loginInstance.state.username).toEqual('myusername');
      expect(loginInstance.state.password).toEqual('somepassword');
    });

    it('should handle the login when user submits the login form', () => {
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
    it('redirects to nextPath when user is logged in and visits login page', () => {
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
