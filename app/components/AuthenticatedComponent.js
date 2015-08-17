import React from 'react';
import LoginStore from '../stores/LoginStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }

    constructor() {
      super();
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.getState().user,
        authToken: LoginStore.getState().token
      };
    }

    componentDidMount() {
      LoginStore.addChangeListener(this._onChange.bind(this));
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        authToken={this.state.authToken}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }

  };
};
