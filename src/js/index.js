import 'babel/polyfill';

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import TempStorage from './services/TempStorage.js';
import Login from './components/Login';
import LoginActions from './actions/LoginActions';
import Overview from './components/overview/Overview';
import Nodes from './components/nodes/Nodes';
import RegisteredNodesTabPane from './components/nodes/RegisteredNodesTabPane';
import DiscoveredNodesTabPane from './components/nodes/DiscoveredNodesTabPane';
import ProvisionedNodesTabPane from './components/nodes/ProvisionedNodesTabPane';
import MaintenanceNodesTabPane from './components/nodes/MaintenanceNodesTabPane';
import Plans from './components/plans/Plans';

import LoginStore from './stores/LoginStore';

function checkAuth(nextState, replaceState) {
  if (!LoginStore.isLoggedIn()) {
    replaceState(null, '/login', { nextPath: nextState.location.pathname });
  }
}

let routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Overview} onEnter={checkAuth}/>
    <Route path="nodes" component={Nodes} onEnter={checkAuth}>
      <IndexRoute component={RegisteredNodesTabPane}/>
      <Route path="discovered" component={DiscoveredNodesTabPane}/>
      <Route path="provisioned" component={ProvisionedNodesTabPane}/>
      <Route path="maintenance" component={MaintenanceNodesTabPane}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path="plans" component={Plans} onEnter={checkAuth}/>
  </Route>
);

TempStorage.initialized.then(() => {
  let keystoneAuthTokenId = TempStorage.getItem('keystoneAuthTokenId');
  if (keystoneAuthTokenId) {
    LoginActions.authenticateUserViaToken(keystoneAuthTokenId);
  }
});

React.render(<Router>{routes}</Router>, document.body);
