import AppDispatcher from '../dispatchers/AppDispatcher.js';
import ValidationsConstants from '../constants/ValidationsConstants';

export default {
  listStages(stages) {
    AppDispatcher.dispatch({
      actionType: ValidationsConstants.LIST_STAGES,
      stages: stages
    });
  }
};
