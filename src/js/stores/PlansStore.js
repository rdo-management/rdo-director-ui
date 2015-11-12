import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      plans: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case PlansConstants.LIST_PLANS:
      this.onListPlans(payload.plans);
      break;
    default:
      break;
    }
  }

  onListPlans(plans) {
    this.state.plans = plans;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new PlansStore();
