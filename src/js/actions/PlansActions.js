import AppDispatcher from '../dispatchers/AppDispatcher.js';
import PlansConstants from '../constants/PlansConstants';
import TripleOApiService from '../services/TripleOApiService';

export default {
  choosePlan(planName) {
    TripleOApiService.getPlan(planName).then(plan => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.GET_PLAN,
        plan: plan
      });
    });
  }
};
