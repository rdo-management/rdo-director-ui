import when from 'when';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationActions from '../actions/NotificationActions';
import PlanUploadConstants from '../constants/PlanUploadConstants';
import TripleOApiService from '../services/TripleOApiService';

export default {
  createPlan(name, files) {
    when(TripleOApiService.createPlan(name, files).then(result => {
      AppDispatcher.dispatch({
        actionType: PlanUploadConstants.PLAN_CREATED
      });
      NotificationActions.notify({
        title: 'Plan created',
        message: 'The plan ' + name + ' was sucessfully created.',
        type: 'success'
      });
    }));
  }
};
