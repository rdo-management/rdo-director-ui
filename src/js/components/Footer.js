import React from 'react';

import AuthenticatedComponent from './utils/AuthenticatedComponent';


export default AuthenticatedComponent(class Footer extends React.Component {
  render() {
    if (this.props.userLoggedIn) {
      return (
        <footer className="container-fluid wrapper-footer">
          <p className="pull-right">&copy; 2015 Company Name</p>
        </footer>
      );
    } else {
      return false;
    }
  }
});
