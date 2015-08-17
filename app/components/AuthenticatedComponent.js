import React from 'react';
import LoginStore from '../stores/LoginStore';

export default (ComposedComponent) => {
  class AuthenticatedComponent extends React.Component {

    constructor() {
      super();
      this.state = this._getLoginState();
    }

    componentDidMount() {
      LoginStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUpdate () {
      if (!LoginStore.isLoggedIn()) {
        this.context.router.transitionTo('/login');
      }
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
      this.setState(this._getLoginState());
    }


    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.getState().user
      };
    }

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
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
  AuthenticatedComponent.contextTypes = {
    router: React.PropTypes.func
  };

  return AuthenticatedComponent;
};
