import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import AuthenticatedContent from './components/AuthenticatedContent';
import DiscoveredNodesTabPane from './components/nodes/DiscoveredNodesTabPane';
import EnvironmentConfiguration from
  './components/environment_configuration/EnvironmentConfiguration.js';
import Login from './components/Login';
import LoginActions from './actions/LoginActions';
import LoginStore from './stores/LoginStore';
import MaintenanceNodesTabPane from './components/nodes/MaintenanceNodesTabPane';
import Nodes from './components/nodes/Nodes';
import Overview from './components/Overview';
import Parameters from './components/plan/Parameters.js';
import Plan from './components/plan/Plan.js';
import ProvisionedNodesTabPane from './components/nodes/ProvisionedNodesTabPane';
import NewPlan from './components/plan/NewPlan';
import RegisteredNodesTabPane from './components/nodes/RegisteredNodesTabPane';
import Roles from './components/roles/Roles.js';
import TempStorage from './services/TempStorage.js';
import Validations from './components/validations/Validations.js';

function checkAuth(nextState, replaceState) {
  if (!LoginStore.isLoggedIn()) {
    replaceState(null, '/login', { nextPath: nextState.location.pathname });
  }
}

let routes = (
  <Route path="/" component={App}>
    <Route component={AuthenticatedContent} onEnter={checkAuth}>
      <IndexRoute component={Overview}/>
      <Route path="nodes" component={Nodes}>
        <IndexRoute component={RegisteredNodesTabPane}/>
        <Route path="discovered" component={DiscoveredNodesTabPane}/>
        <Route path="provisioned" component={ProvisionedNodesTabPane}/>
        <Route path="maintenance" component={MaintenanceNodesTabPane}/>
      </Route>
      <Route component={Plan}>
        <Redirect from="plan" to="plan/environment"/>
        <Route path="plan/environment" component={EnvironmentConfiguration}/>
        <Route path="plan/roles" component={Roles}/>
        <Route path="plan/parameters" component={Parameters}/>
        <Route path="plan/validations" component={Validations}/>
        <Route path="plan/create" component={NewPlan} onEnter={checkAuth}/>
      </Route>
    </Route>
    <Route path="login" component={Login}/>
  </Route>
);

TempStorage.initialized.then(() => {
  let keystoneAuthTokenId = TempStorage.getItem('keystoneAuthTokenId');
  if (keystoneAuthTokenId) {
    LoginActions.authenticateUserViaToken(keystoneAuthTokenId);
  }
});

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('react-app-index'));
