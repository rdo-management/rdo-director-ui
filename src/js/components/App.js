import React from 'react';
import * as Router from 'react-router';

import NavBar from './NavBar';
import NotificationList from './ui/NotificationList';

let RouteHandler = Router.RouteHandler;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NotificationList/>
        <NavBar/>
        <div className="container-fluid">
          <RouteHandler/>
        </div>
      </div>
    );
  }
}
