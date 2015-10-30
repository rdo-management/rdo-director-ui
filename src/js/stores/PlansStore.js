import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      plans: [],
      currentPlan: undefined
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case PlansConstants.LIST_PLANS:
      this.onListPlans(payload.plans);
      break;
    case PlansConstants.GET_PLAN:
      this.onGetPlan(payload.plan);
      break;
    default:
      break;
    }
  }

  onListPlans(plans) {
    this.state.plans = plans;
    this.emitChange();
  }

  onGetPlan(plan) {
    this.state.currentPlan = plan;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new PlansStore();
