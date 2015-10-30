import React from 'react';
import { Link } from 'react-router';

import LoginActions from '../actions/LoginActions';
import NavTab from './ui/NavTab';
import PlansStore from '../stores/PlansStore';


export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      plan: {},
      planNames: []
    }
    this.changeListener = this._onPlanChange.bind(this);
  }

  logout(e) {
    e.preventDefault();
    LoginActions.logoutUser();
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onPlanChange() {
    this.setState({plan: PlansStore.getPlan()});
  }

  _getPlanUrl(page) {
    let plan = this.state.plan || {};
    return plan.name ? `/plan/${plan.name}/${page}` : `/plan/${page}`;
  }

  render() {
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
            <NavTab to="/images">Images</NavTab>
            <NavTab to="/nodes">Nodes</NavTab>
            <NavTab to="plans/list">Plans</NavTab>
            <NavTab to={this._getPlanUrl.bind(this)('environment')}>Environment</NavTab>
            <NavTab to={this._getPlanUrl.bind(this)('roles')}>Roles</NavTab>
            <NavTab to={this._getPlanUrl.bind(this)('parameters')}>Service Configuration</NavTab>
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
