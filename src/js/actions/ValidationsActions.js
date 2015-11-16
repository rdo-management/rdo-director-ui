import AppDispatcher from '../dispatchers/AppDispatcher.js';
import ValidationsConstants from '../constants/ValidationsConstants';

export default {
  listValidationTypes(validationTypes) {
    AppDispatcher.dispatch({
      actionType: ValidationsConstants.LIST_VALIDATION_TYPES,
      validationTypes: validationTypes
    });
  }
};
