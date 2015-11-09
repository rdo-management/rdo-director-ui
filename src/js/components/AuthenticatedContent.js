import React from 'react';

import AuthenticatedComponent from './utils/AuthenticatedComponent';

import NavBar from './NavBar';
import Footer from './Footer';
import NotificationList from './ui/NotificationList';

export default AuthenticatedComponent(class Nodes extends React.Component {
  render() {
    return (
      <div>
        <header>
          <NavBar/>
        </header>
        <div className="wrapper-fixed-body container-fluid">
          {this.props.children}
        </div>
        <NotificationList className="above-footer"/>
        <Footer/>
      </div>
    );
  }
});
