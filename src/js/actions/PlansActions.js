import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationActions from '../actions/NotificationActions';
import PlansConstants from '../constants/PlansConstants';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';

export default {
  requestPlanslist() {
    return {
      type: PlansConstants.REQUEST_PLANSLIST
    };
  },

  receivePlanslist(plans) {
    return {
      type: PlansConstants.RECEIVE_PLANSLIST,
      payload: plans
    };
  },

  fetchPlanslist() {
    return (dispatch, getState) => {
      dispatch(this.requestPlanslist());
      return TripleOApiService.getPlans().then(response => {
        dispatch(this.receivePlanslist(response.plans));
      }).catch(error => {
        console.error('Error retrieving plans PlansActions.listPlans', error); //eslint-disable-line no-console
        dispatch(this.receivePlanslist([]));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
        });
      });
    };
  },

  listPlans() {
    TripleOApiService.getPlans().then(res => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.LIST_PLANS,
        plans: res.plans
      });
    }).catch(error => {
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  },

  choosePlan(planName) {
    AppDispatcher.dispatch({
      actionType: PlansConstants.GET_PLAN,
      planName: planName
    });
    NotificationActions.notify({
      title: 'Plan Activated',
      message: 'The plan ' + planName + ' was activated.',
      type: 'success'
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
