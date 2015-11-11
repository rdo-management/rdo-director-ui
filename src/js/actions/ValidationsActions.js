import AppDispatcher from '../dispatchers/AppDispatcher.js';
import ValidationsConstants from '../constants/ValidationsConstants';

export default {
  listValidations(validations) {
    AppDispatcher.dispatch({
      actionType: ValidationsConstants.LIST_VALIDATIONS,
      validations: validations
    });
  }
};
