import BaseStore from './BaseStore';
import ValidationsConstants from '../constants/ValidationsConstants';

class ValidationsStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      validationTypes: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case ValidationsConstants.LIST_VALIDATION_TYPES:
      this.onListValidationTypes(payload.validationTypes);
      break;
    default:
      break;
    }
  }

  onListValidationTypes(validationTypes) {
    this.state.validationTypes = validationTypes;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new ValidationsStore();
