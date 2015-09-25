import Formsy from 'formsy-react';
import React from 'react';

import FormErrorList from './ui/forms/FormErrorList';
import GenericInput from './ui/forms/GenericInput';
import KeystoneApiErrorHandler from '../services/KeystoneApiErrorHandler';
import KeystoneApiService from '../services/KeystoneApiService';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';
import NotificationActions from '../actions/NotificationActions';

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
    this._shouldRedirect();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this._shouldRedirect();
  }

  _shouldRedirect() {
    if (LoginStore.isLoggedIn()) {
      let nextPath = this.context.router.getCurrentQuery().nextPath || 'overview';
      this.context.router.transitionTo(nextPath);
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

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-xs-8 col-md-offset-3 col-xs-offset-2">
          <div className="panel panel-default panel-login">
            <div className="panel-heading">
              <h1 className="panel-title">TripleO UI Login</h1>
            </div>
            <div className="panel-body">
              <FormErrorList errors={this.state.formErrors}/>
              <Formsy.Form ref="form" role="form"
                           onSubmit={this.handleLogin.bind(this)}
                           onValid={this._enableButton.bind(this)}
                           onInvalid={this._disableButton.bind(this)}>
                <GenericInput name="username"
                              placeholder="Username"
                              title="Username"
                              validationError="Username is required"
                              required/>
                <GenericInput type="password"
                              name="password"
                              placeholder="Password"
                              title="Password"
                              validationError="Password is required"
                              required/>
                <button type="submit" disabled={!this.state.canSubmit} className="btn btn-primary">
                  Submit
                </button>
              </Formsy.Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func
};
