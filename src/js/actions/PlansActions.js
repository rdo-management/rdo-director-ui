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

  detectPlan(plans) {
    return {
      type: PlansConstants.DETECT_PLAN,
      payload: plans
    }
  },

  fetchPlans() {
    return (dispatch, getState) => {
      dispatch(this.requestPlans());
      TripleOApiService.getPlans().then(response => {
        /*
         * TODO(flfuchs) remove when delete plans is implemented
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
      TripleOApiService.getPlan(planName).then(response => {
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

  choosePlan(planName) {
    NotificationActions.notify({
      title: 'Plan Activated',
      message: 'The plan ' + planName + ' was activated.',
      type: 'success'
    });
    return {
      type: PlansConstants.CHOOSE_PLAN,
      payload: planName
    };
  },

  /*
   * TODO(flfuchs) remove when delete plans is implemented
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
