import React from 'react';

import AuthenticatedComponent from './utils/AuthenticatedComponent';


export default AuthenticatedComponent(class Footer extends React.Component {
  render() {
    if (this.props.userLoggedIn) {
      return (
        <footer className="navbar-fixed-bottom wrapper-footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <p className="pull-right">&copy; 2015 Company Name</p>
              </div>
            </div>
          </div>
        </footer>
      );
    } else {
      return false;
    }
  }
});
