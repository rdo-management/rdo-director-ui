import React from 'react';

import LoginStore from '../../stores/LoginStore';

export default (ComposedComponent) => {
  class AuthenticatedComponent extends React.Component {

    constructor() {
      super();
      this.state = this._getLoginState();
      this.changeListener = this._onChange.bind(this);
    }

    componentDidMount() {
      LoginStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
      if (this.state.userLoggedIn) {
        this.context.router.transitionTo('/login');
      }
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
  AuthenticatedComponent.propTypes = {
    user: React.PropTypes.object,
    userLoggedIn: React.PropTypes.func
  };
  AuthenticatedComponent.contextTypes = {
    router: React.PropTypes.func
  };

  return AuthenticatedComponent;
};
