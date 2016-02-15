import * as _ from 'lodash';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationActions from '../actions/NotificationActions';
import PlansConstants from '../constants/PlansConstants';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';

export default {
  requestPlans() {
    return {
      type: PlansConstants.REQUEST_PLANS
    };
  },

  receivePlans(plans) {
    return {
      type: PlansConstants.RECEIVE_PLANS,
      payload: plans
    };
  },

  planDetected(currentPlanName, conflict) {
    return {
      type: PlansConstants.PLAN_DETECTED,
      payload: {
        currentPlanName: currentPlanName,
        conflict: conflict
      }
    };
  },

  detectPlan(plans) {
    return (dispatch, getState) => {
      let planNames = _.map(plans, plan => plan.name).sort();
      let state = getState();
      let conflict;
      let currentPlanName = state.plans.get('currentPlanName');
      let previousPlan = currentPlanName || getStoredPlan();
      // No plans present.
      if(planNames.length < 1 ) {
        if(!previousPlan) {
          currentPlanName = undefined;
        }
      }
      // Plans present.
      // No previously chosen plan.
      else if(!previousPlan) {
        currentPlanName = planNames[0];
      }
      // Previously chosen plan doesn't exist any more.
      else if(!_.includes(planNames, previousPlan)) {
        conflict = previousPlan;
        currentPlanName = planNames[0];
      }
      // No plan in state, but in localStorage
      else if(!currentPlanName && previousPlan) {
        currentPlanName = previousPlan;
      }
      storePlan(currentPlanName);
      dispatch(this.planDetected(currentPlanName, conflict));
    };
  },

  fetchPlans() {
    return dispatch => {
      dispatch(this.requestPlans());
      TripleOApiService.getPlans().then(response => {
        /*
         * TODO(flfuchs) remove when delete plans is implemented as redux action
         */
        AppDispatcher.dispatch({
          actionType: PlansConstants.LIST_PLANS,
          plans: response.plans
        });

        dispatch(this.receivePlans(response.plans));
        dispatch(this.detectPlan(response.plans));
      }).catch(error => {
        console.error('Error retrieving plans PlansActions.fetchPlanslist', error); //eslint-disable-line no-console
        dispatch(this.receivePlans([]));
        dispatch(this.detectPlan([]));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });
    };
  },

  requestPlan() {
    return {
      type: PlansConstants.REQUEST_PLAN
    };
  },

  receivePlan(plan) {
    return {
      type: PlansConstants.RECEIVE_PLAN,
      payload: plan
    };
  },

  fetchPlan(planName) {
    return dispatch => {
      dispatch(this.requestPlan());
      TripleOApiService.getPlan(planName).then(response => {
        dispatch(this.receivePlan(response.plan));
      }).catch(error => {
        console.error('Error retrieving plan PlansActions.fetchPlan', error); //eslint-disable-line no-console
        dispatch(this.receivePlan({}));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });
    };
  },

  choosePlan(planName) {
    return dispatch => {
      dispatch(NotificationActions.notify({
        title: 'Plan Activated',
        message: 'The plan ' + planName + ' was activated.',
        type: 'success'
      }));
      storePlan(planName);
      dispatch(this.planChosen(planName));
    };
  },

  planChosen(planName) {
    return {
      type: PlansConstants.PLAN_CHOSEN,
      payload: planName
    };
  },

  /*
   * TODO(flfuchs) remove when delete plans is implemented as redux action
   */
  listPlans() {
    TripleOApiService.getPlans().then(res => {
    }).catch(error => {
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  },

  deletingPlan(planName) {
    AppDispatcher.dispatch({
      actionType: PlansConstants.DELETING_PLAN,
      planName: planName
    });
  },

  planDeleted(planName) {
    AppDispatcher.dispatch({
      actionType: PlansConstants.PLAN_DELETED,
      planName: planName
    });
  }
};

function storePlan(name) {
  if(window && window.localStorage) {
    if(!name) {
      window.localStorage.removeItem('currentPlanName');
    }
    else {
      window.localStorage.setItem('currentPlanName', name);
    }
  }
}

function getStoredPlan() {
  if(window && window.localStorage) {
    return window.localStorage.getItem('currentPlanName');
  }
  return null;
}
