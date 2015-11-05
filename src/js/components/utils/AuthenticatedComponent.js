import React from 'react';

import LoginStore from '../../stores/LoginStore';

export default (ComposedComponent) => {
  class AuthenticatedComponent extends React.Component {

    constructor() {
      super();
      this.state = this._getLoginState();
      this.changeListener = this._onChange.bind(this);
    }

    getChildContext() {
      return this.state;
    }

    componentDidMount() {
      LoginStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
      this._shouldRedirectToLogin();
      this.setState(this._getLoginState());
    }

    _shouldRedirectToLogin() {
      if (!LoginStore.userLoggedIn) {
        this.context.history.pushState(null, '/login');
      }
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.getState().user
      };
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }

  }
  AuthenticatedComponent.propTypes = {
    user: React.PropTypes.object,
    userLoggedIn: React.PropTypes.func
  };
  AuthenticatedComponent.contextTypes = {
    history: React.PropTypes.object
  };
  AuthenticatedComponent.childContextTypes = {
    user: React.PropTypes.object,
    userLoggedIn: React.PropTypes.bool
  };

  return AuthenticatedComponent;
};
