import BaseStore from './BaseStore';
import ValidationsConstants from '../constants/ValidationsConstants';

class ValidationsStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      stages: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case ValidationsConstants.LIST_STAGES:
      this.onListStages(payload.stages);
      break;
    default:
      break;
    }
  }

  onListStages(stages) {
    this.state.stages = stages;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new ValidationsStore();
