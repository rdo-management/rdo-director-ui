import * as _ from 'lodash';

import history from '../history';
import NotificationActions from '../actions/NotificationActions';
import PlansConstants from '../constants/PlansConstants';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';
import utils from '../services/utils';

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
    return (dispatch, getState) => {
      dispatch(this.requestPlans());
      TripleOApiService.getPlans(utils.getAuthTokenId(getState())).then(response => {
        dispatch(this.receivePlans(response.plans));
        dispatch(this.detectPlan(response.plans));
      }).catch(error => {
        console.error('Error retrieving plans PlansActions.fetchPlans', error); //eslint-disable-line no-console
        dispatch(this.receivePlans([]));
        dispatch(this.detectPlan([]));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
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
    return (dispatch, getState) => {
      dispatch(this.requestPlan());
      TripleOApiService.getPlan(utils.getAuthTokenId(getState()), planName).then(response => {
        dispatch(this.receivePlan(response.plan));
      }).catch(error => {
        console.error('Error retrieving plan PlansActions.fetchPlan', error); //eslint-disable-line no-console
        dispatch(this.receivePlan({}));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
        });
      });
    };
  },

  planFilesSelected(files) {
    return {
      type: PlansConstants.PLAN_FILES_SELECTED,
      payload: files
    };
  },

  choosePlan(planName) {
    NotificationActions.notify({
      title: 'Plan Activated',
      message: 'The plan ' + planName + ' was activated.',
      type: 'success'
    });
    storePlan(planName);
    return {
      type: PlansConstants.CHOOSE_PLAN,
      payload: planName
    };
  },

  creatingPlan() {
    return {
      type: PlansConstants.CREATING_PLAN
    };
  },

  planCreated() {
    return {
      type: PlansConstants.PLAN_CREATED
    };
  },

  updatePlan(planName, planFiles) {
    return (dispatch, getState) => {
      dispatch(this.updatingPlan());
      TripleOApiService.updatePlan(
        utils.getAuthTokenId(getState()),
        planName,
        planFiles
      ).then(result => {
        dispatch(this.planUpdated(planName));
        dispatch(this.fetchPlans());
        history.pushState(null, '/plans/list');
        NotificationActions.notify({
          title: 'Plan Updated',
          message: `The plan ${planName} was successfully updated.`,
          type: 'success'
        });
      }).catch(error => {
        console.error('Error in PlansActions.updatePlan', error); //eslint-disable-line no-console
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
        });
      });
    };
  },

  createPlan(planName, planFiles) {
    return (dispatch, getState) => {
      dispatch(this.creatingPlan());
      TripleOApiService.createPlan(
        utils.getAuthTokenId(getState()),
        planName,
        planFiles
      ).then(result => {
        dispatch(this.planCreated(planName));
        dispatch(this.fetchPlans());
        history.pushState(null, '/plans/list');
        NotificationActions.notify({
          title: 'Plan Created',
          message: `The plan ${planName} was successfully created.`,
          type: 'success'
        });
      }).catch(error => {
        console.error('Error in PlansActions.createPlan', error); //eslint-disable-line no-console
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
        });
      });
    };
  },

  updatingPlan() {
    return {
      type: PlansConstants.UPDATING_PLAN
    };
  },

  planUpdated() {
    return {
      type: PlansConstants.PLAN_UPDATED
    };
  },

  deletingPlan(planName) {
    return {
      type: PlansConstants.DELETING_PLAN,
      payload: planName
    };
  },

  planDeleted(planName) {
    NotificationActions.notify({
      title: 'Plan Deleted',
      message: `The plan ${planName} was successfully deleted.`,
      type: 'success'
    });
    return {
      type: PlansConstants.PLAN_DELETED
    };
  },

  deletePlan(planName) {
    return (dispatch, getState) => {
      dispatch(this.deletingPlan(planName));
      history.pushState(null, '/plans/list');
      TripleOApiService.deletePlan(utils.getAuthTokenId(getState()), planName).then(response => {
        dispatch(this.planDeleted());
        dispatch(this.fetchPlans());
      }).catch(error => {
        console.error('Error retrieving plan TripleOApiService.deletePlan', error); //eslint-disable-line no-console
        dispatch(this.planDeleted());
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
        });
      });
    };
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
