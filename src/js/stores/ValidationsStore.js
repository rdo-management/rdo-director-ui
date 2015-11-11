import BaseStore from './BaseStore';
import ValidationsConstants from '../constants/ValidationsConstants';

class ValidationsStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      validations: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case ValidationsConstants.LIST_VALIDATIONS:
      this.onListValidations(payload.validations);
      break;
    default:
      break;
    }
  }

  onListValidations(validations) {
    this.state.validations = validations;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new ValidationsStore();
