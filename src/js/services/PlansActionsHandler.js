import * as _ from 'lodash';

import NotificationActions from '../actions/NotificationActions';
import PlansStore from '../stores/PlansStore';
import PlansActions from '../actions/PlansActions';

class PlansActionsHandler {

  onChoosePlan() {
    let planName = PlansStore.getCurrentPlanName();
    if(planName && window && window.localStorage) {
      window.localStorage.setItem('currentPlanName', planName);
    }
  }

  onListPlans() {
    let state = PlansStore.getState();
    let previousPlan = this._getPreviousPlan(state);
    // No plans present.
    if(state.planNames.length < 1) {
      if(!previousPlan) {
        return;
      }
      // If there was a previously chosen plan, show a message.
      NotificationActions.notify({
        title: 'Plan Conflict',
        message: `The previously used plan ${previousPlan} does not exist.`,
        type: 'warning'
      });
    }
    // Plans present.
    // No previously chosen plan.
    else if(!previousPlan) {
      this._chooseAndStorePlan(state.planNames[0]);
    }
    // Previously chosen plan doesn't exist any more.
    else if(!_.includes(state.planNames, previousPlan)) {
      NotificationActions.notify({
        title: 'Plan Conflict',
        message: `The previously used plan ${previousPlan} does not exist.`,
        type: 'warning'
      });
      this._chooseAndStorePlan(state.planNames[0]);
    }
    // No plan in state, but in localStorage
    else if(!state.currentPlanName && previousPlan) {
      PlansActions.choosePlan(previousPlan);
    }
  }

  _chooseAndStorePlan(planName) {
    PlansActions.choosePlan(planName);
    this._storePlan(planName);
  }

  _storePlan(planName) {
    if(window && window.localStorage) {
      window.localStorage.setItem('currentPlanName', planName);
    }
  }

  _getPreviousPlan(state) {
    return state.currentPlanName || this._getStoredPlan();
  }

  _getStoredPlan() {
    if(window && window.localStorage) {
      return window.localStorage.getItem('currentPlanName');
    }
    return null;
  }

}

export default new PlansActionsHandler();
