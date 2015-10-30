import AppDispatcher from '../dispatchers/AppDispatcher.js';
import PlansConstants from '../constants/PlansConstants';
import PlansStore from '../stores/PlansStore';
import TripleOApiService from '../services/TripleOApiService';

export default {
  listPlans() {
    TripleOApiService.getPlans().then(plans => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.LIST_PLANS,
        plans: plans
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
