import React from 'react';
import * as Router from 'react-router';

import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

let RouteHandler = Router.RouteHandler;
let Link = Router.Link;

export default class App extends React.Component {

  get header() {
    if (LoginStore.isLoggedIn()) {
      return (
        <div className="row">
          <ul className="nav nav-tabs">
            <li><Link to="overview">Overview</Link></li>
            <li className="pull-right"><a href="#" onClick={this.logout}>Logout</a></li>
          </ul>
        </div>
      );
    }
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
  }

  render() {
    return (
      <div className="container">
        {this.header}
        <RouteHandler/>
      </div>
    );
  }
}
