import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import AuthenticatedContent from './components/AuthenticatedContent';
import DeletePlan from './components/plan/DeletePlan';
import Deployment from './components/deployment/Deployment.js';
import DiscoveredNodesTabPane from './components/nodes/DiscoveredNodesTabPane';
import EditPlan from './components/plan/EditPlan';
import EnvironmentConfiguration from
  './components/environment_configuration/EnvironmentConfiguration.js';
import Flavors from './components/flavors/Flavors';
import Images from './components/images/Images';
import ListPlans from './components/plan/ListPlans';
import Login from './components/Login';
import LoginActions from './actions/LoginActions';
import LoginStore from './stores/LoginStore';
import MaintenanceNodesTabPane from './components/nodes/MaintenanceNodesTabPane';
import NewPlan from './components/plan/NewPlan';
import Nodes from './components/nodes/Nodes';
import Overview from './components/Overview';
import Parameters from './components/parameters/Parameters.js';
import Plan from './components/plan/Plan.js';
import Plans from './components/plan/Plans.js';
import PlansStore from './stores/PlansStore';
import ProvisionedNodesTabPane from './components/nodes/ProvisionedNodesTabPane';
import RegisteredNodesTabPane from './components/nodes/RegisteredNodesTabPane';
import Roles from './components/roles/Roles.js';
import TempStorage from './services/TempStorage.js';

function checkAuth(nextState, replaceState) {
  if (!LoginStore.isLoggedIn()) {
    replaceState(null, '/login', { nextPath: nextState.location.pathname +
                                             nextState.location.search });
  }
}

function checkCurrentPlan(nextState, replaceState) {
  if(!PlansStore.getCurrentPlanName()) {
    replaceState(null, '/plans/list');
  }
}

let routes = (
  <Route path="/" component={App}>
    <Route component={AuthenticatedContent} onEnter={checkAuth}>
      <IndexRoute component={Overview}/>
      <Route path="images" component={Images}/>
      <Redirect from="nodes" to="nodes/registered"/>
      <Route path="nodes" component={Nodes}>
        <Route path="registered" component={RegisteredNodesTabPane}/>
        <Route path="discovered" component={DiscoveredNodesTabPane}/>
        <Route path="provisioned" component={ProvisionedNodesTabPane}/>
        <Route path="maintenance" component={MaintenanceNodesTabPane}/>
      </Route>
      <Route path="flavors" component={Flavors}/>

      <Redirect from="plans" to="plans/list"/>
      <Route path="plans" component={Plans}>
        <Route path="list" component={ListPlans}>
          <Route path="/plans/new" component={NewPlan}/>
          <Route path="/plans/:planName/edit" component={EditPlan}/>
        </Route>
        <Route path=":planName/delete" component={DeletePlan}/>
      </Route>

      <Redirect from="plan" to="plan/environment"/>
      <Route path="plan" component={Plan} onEnter={checkCurrentPlan}>
        <Route path="environment" component={EnvironmentConfiguration}/>
        <Route path="roles" component={Roles}/>
        <Route path="parameters" component={Parameters}/>
        <Route path="deployment" component={Deployment}/>
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
