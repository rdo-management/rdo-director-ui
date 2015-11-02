import React from 'react';
import { Link } from 'react-router';

import AuthenticatedComponent from './utils/AuthenticatedComponent';
import LoginActions from '../actions/LoginActions';
import NavTab from './ui/NavTab';


export default AuthenticatedComponent(class NavBar extends React.Component {
  logout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
  }

  render() {
    if (this.props.userLoggedIn) {
      return (
        <nav className="navbar navbar-default navbar-pf navbar-fixed-top" role="navigation">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img src="img/brand.svg" alt="RDO Director" />
            </a>
          </div>
          <div className="collapse navbar-collapse navbar-collapse-1">
            <ul className="nav navbar-nav navbar-utility">
              <li className="dropdown">
                <a className="dropdown-toggle navbar-item" data-toggle="dropdown" data-target="#" id="drop1">
                  <span className="pficon pficon-user"></span>
                  {this.props.user.username} <b className="caret"></b>
                </a>
                <ul className="dropdown-menu" aria-labelledby="drop1">
                  <li role="presentation"><a role="menuitem" tabIndex="-1" onClick={this.logout}>Log Out</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-primary">
              <NavTab to="/" onlyActiveOnIndex>Overview</NavTab>
              <NavTab to="nodes">Nodes</NavTab>
            </ul>
          </div>
        </nav>
      );
    } else {
      return false;
    }
  }
});
