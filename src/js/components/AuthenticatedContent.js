import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import Loader from './ui/Loader';
import LoginActions from '../actions/LoginActions';

import NavBar from './NavBar';
import Footer from './Footer';
import NotificationsToaster from './notifications/NotificationsToaster';

export default class AuthenticatedContent extends React.Component {
  logoutUser() {
    this.props.dispatch(LoginActions.logoutUser());
  }

  render() {
    return (
      <div>
        <Loader loaded={!this.props.isAuthenticating}
                content="Authenticating ..."
                global>
          <header>
            <NavBar user={this.props.user}
                    onLogout={this.logoutUser.bind(this)}/>
          </header>
          <div className="wrapper-fixed-body container-fluid">
            {this.props.children}
          </div>
          <Footer/>
        </Loader>
        <NotificationsToaster />
      </div>
    );
  }
}
AuthenticatedContent.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticating: React.PropTypes.bool.isRequired,
  user: ImmutablePropTypes.map
};

function mapStateToProps(state) {
  return {
    isAuthenticating: state.login.get('isAuthenticating'),
    user: state.login.getIn(['keystoneAccess', 'user'])
  };
}

export default connect(mapStateToProps)(AuthenticatedContent);
