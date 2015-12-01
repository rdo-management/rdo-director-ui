import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationActions from '../actions/NotificationActions';
import PlansConstants from '../constants/PlansConstants';
import PlansActionsHandler from '../services/PlansActionsHandler';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';

export default {
  listPlans() {
    TripleOApiService.getPlans().then(res => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.LIST_PLANS,
        plans: res.plans
      });
      PlansActionsHandler.onListPlans();
    }).catch(error => {
      console.error('Error retrieving plans PlansActions.listPlans', error);
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
    PlansActionsHandler.onChoosePlan();
    NotificationActions.notify({
      title: 'Plan Activated',
      message: 'The plan ' + planName + ' was activated.',
      type: 'success'
    });
  }
};
