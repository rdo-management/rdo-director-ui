import Formsy from 'formsy-react';
import React from 'react';
import ReactDOM from 'react-dom';

import FormErrorList from './ui/forms/FormErrorList';
import LoginInput from './ui/forms/LoginInput';
import KeystoneApiErrorHandler from '../services/KeystoneApiErrorHandler';
import KeystoneApiService from '../services/KeystoneApiService';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import NotificationActions from '../actions/NotificationActions';
import NotificationList from './ui/NotificationList';

var mockData = true;

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      formErrors: []
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentWillMount() {
    ReactDOM.findDOMNode(document.documentElement).className = 'login-pf';
    this._shouldRedirect();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(document.documentElement).className = '';
    LoginStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this._shouldRedirect();
  }

  _shouldRedirect() {
    if (LoginStore.isLoggedIn()) {
      let nextPath = this.props.location.query.nextPath || '/';
      this.props.history.pushState(null, nextPath);
    }
  }

  _enableButton() {
    this.setState({ canSubmit: true });
  }

  _disableButton() {
    this.setState({ canSubmit: false });
  }

  handleLogin(formData, resetForm, invalidateForm) {
    this._disableButton();
    if (!mockData || formData.username == 'fail')
    {
      KeystoneApiService.authenticateUser(formData.username, formData.password).then((response) => {
        LoginActions.loginUser(response.access);
        NotificationActions.notify({
          title: 'Login Successful',
          message: 'The user was logged in successfully',
          type: 'success'
        });
      }).catch((error) => {
        this._enableButton();
        console.error('Error in handleLogin', error);
        let errorHandler = new KeystoneApiErrorHandler(error, Object.keys(this.refs.form.inputs));
        invalidateForm(errorHandler.formFieldErrors);
        this.setState({
          formErrors: errorHandler.errors
        });
      });
    }
    else {
      let mockKeystoneAccess = {
        token: {
          id: 'someTokenIdString'
        },
        user: {username: formData.username},
        serviceCatalog: 'service catalog',
        metadata: 'some metadata'
      };
      LoginActions.loginUser(mockKeystoneAccess);
      NotificationActions.notify({
        title: 'Login Successful (MOCK)',
        message: 'The user was logged in successfully (MOCK)',
        type: 'success'
      });
    }
  }

  render() {
    return (
      <div>
        <span id="badge">
          <img src="img/logo.svg" alt="RDO Manager"></img>
        </span>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div id="brand">
                <img src="img/brand.svg" alt="RDO Manager"></img>
              </div>
            </div>
            <div className="col-sm-7 col-md-6 col-lg-5 login">
              <FormErrorList errors={this.state.formErrors}/>
              <Formsy.Form ref="form"
                           role="form"
                           className="form-horizontal"
                           onSubmit={this.handleLogin.bind(this)}
                           onValid={this._enableButton.bind(this)}
                           onInvalid={this._disableButton.bind(this)}>
                <LoginInput name="username"
                            placeholder="Username"
                            title="Username"
                            validationError="Username is required"
                            required/>
                <LoginInput type="password"
                            name="password"
                            placeholder="Password"
                            title="Password"
                            validationError="Password is required"
                            required/>
                <div className="form-group">
                  <div className="col-xs-offset-8 col-xs-4 col-sm-4 col-md-4 submit">
                    <button type="submit" disabled={!this.state.canSubmit}
                            className="btn btn-primary btn-lg" tabIndex="4">
                      Log In
                    </button>
                  </div>
                </div>
              </Formsy.Form>
            </div>
            <div className="col-sm-5 col-md-6 col-lg-7 details">
              <p>
                <strong>Welcome to the RDO Manager.</strong><br/>
                The RDO Manager will help you manage your OpenStack deployments. It's the best
                thing since sliced bread. We think you will really enjoy it!
              </p>
            </div>
          </div>
        </div>
        <NotificationList/>
      </div>
    );
  }
}
Login.propTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object
};
