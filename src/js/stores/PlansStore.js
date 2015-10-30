import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      plan: null
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case PlansConstants.GET_PLAN:
      this.onGetPlan(payload.plan);
      break;
    default:
      break;
    }
  }

  onGetPlan(plan) {
    this.state.plan = plan;
    this.emitChange();
  }

  getState() {
    return this.state;
  }

  getPlan() {
    return this.state.plan;
  }

  getPlanName() {
    return this.state.plan ? this.state.plan.name : null;
  }
}

export default new PlansStore();
