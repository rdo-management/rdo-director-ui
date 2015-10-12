import React from 'react';

import NavBar from './NavBar';
import NotificationList from './ui/NotificationList';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NotificationList/>
        <NavBar/>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.element
};
