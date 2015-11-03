import React from 'react';

import NavBar from './NavBar';
import Footer from './Footer';
import NotificationList from './ui/NotificationList';

export default class App extends React.Component {
  render() {
    if (this.props.children.type.name === 'Login') {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    else {
      return (
        <div>
          <header>
            <NavBar/>
          </header>
          <div className="wrapper-fixed-body container-fluid">
            <NotificationList/>
            {this.props.children}
          </div>
          <Footer/>
        </div>
      );
    }
  }
}
App.propTypes = {
  children: React.PropTypes.element
};
