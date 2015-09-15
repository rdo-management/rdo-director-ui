import React from 'react';
import * as Router from 'react-router';

import NavBar from './NavBar';
import NotificationList from './NotificationList';

let RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NotificationList/>
        <NavBar/>
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    );
  }
}
