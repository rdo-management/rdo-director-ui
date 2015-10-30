import React from 'react';
import { Link } from 'react-router';

import LoginActions from '../actions/LoginActions';
import NavTab from './ui/NavTab';
import PlansStore from '../stores/PlansStore';


export default class NavBar extends React.Component {
  logout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
  }

  getPlanBasepath() {
    let planName = PlansStore.getPlanName();
    return planName ? '/plans/' + planName : '/plans';
  }

  // TODO(flfuchs) Add changelistener to check for plan activation
  // and update the navbar links accordingly.

  render() {
    let planBasepath = this.getPlanBasepath();
    return (
      <nav className="navbar navbar-default navbar-pf navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">
            <img src="img/nav-brand.svg" alt="RDO Director" />
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-utility">
            <li>
              <a>
                <span className="pficon pficon-user"></span>
                {this.context.user.username}
              </a>
            </li>
            <li><a href="#" onClick={this.logout}>Logout</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-primary">
            <NavTab to="/" onlyActiveOnIndex>Overview</NavTab>
            <NavTab to="/nodes">Nodes</NavTab>
            <NavTab to={planBasepath + "/list"}>Plans</NavTab>
            <NavTab to={planBasepath + "/environment"}>Environment</NavTab>
            <NavTab to={planBasepath + "/roles"}>Roles</NavTab>
            <NavTab to={planBasepath + "/parameters"}>Service Configuration</NavTab>
            <NavTab to={planBasepath + "/validations"}>Validations</NavTab>
          </ul>
        </div>
      </nav>
    );
  }
}
NavBar.contextTypes = {
  user: React.PropTypes.object,
  userLoggedIn: React.PropTypes.bool
};
