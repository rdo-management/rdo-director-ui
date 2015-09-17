import 'babel/polyfill';

import React from 'react';
import * as Router from 'react-router';

import App from './components/App';
import AuthTokenStorage from './services/AuthTokenStorage.js';
import Login from './components/Login';
import LoginActions from './actions/LoginActions';
import Overview from './components/Overview';
import Nodes from './components/Nodes';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let routes = (
  <Route handler={App}>
    <DefaultRoute handler={Overview} name="overview"/>
    <Route handler={Nodes} name="nodes" path="nodes"/>
    <Route handler={Login} name="login" path="login"/>
  </Route>
);


AuthTokenStorage.getTokenId((keystoneAuthTokenId) => {
  if (keystoneAuthTokenId) {
    LoginActions.authenticateUserViaToken(keystoneAuthTokenId);
  }
});

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
