import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationActions from '../actions/NotificationActions';
import PlansConstants from '../constants/PlansConstants';
import TripleOApiService from '../services/TripleOApiService';

export default {
  listPlans() {
    TripleOApiService.getPlans().then(res => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.LIST_PLANS,
        plans: res.plans
      });
    });
  },

  choosePlan(planName) {
    TripleOApiService.getPlan(planName).then(plan => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.GET_PLAN,
        plan: plan
      });
      NotificationActions.notify({
        title: 'Plan Activated',
        message: 'The plan ' + plan.name + ' activated.',
        type: 'success'
      });
    });
  }
};
