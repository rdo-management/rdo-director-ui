import AppDispatcher from '../dispatchers/AppDispatcher.js';
import PlansConstants from '../constants/PlansConstants';

export default {
  listPlans(plans) {
    AppDispatcher.dispatch({
      actionType: PlansConstants.LIST_PLANS,
      plans: plans
    });
  }
};
