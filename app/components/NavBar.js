import React from 'react';
import * as Router from 'react-router';

import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

let Link = Router.Link;

export default class NavBar extends React.Component {
  logout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
  }

  render() {
    if (LoginStore.isLoggedIn()) {
      return (
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">OpenStack</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="overview">Overview</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return false;
    }
  }
}
