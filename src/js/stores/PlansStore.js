import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      currentPlanName: undefined,
      planNames: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case PlansConstants.GET_PLAN:
      this.onGetPlan(payload.planName);
      break;
    case PlansConstants.LIST_PLANS:
      this.onListPlans(payload.plans);
      break;
    default:
      break;
    }
  }

  onGetPlan(planName) {
    this.state.currentPlanName = planName;
    this.emitChange();
  }

  onListPlans(plans) {
    this.state.planNames = [];
    plans.forEach(item => {
      this.state.planNames.push(item.name);
    });
    this.emitChange();
  }

  getState() {
    return this.state;
  }

  getCurrentPlanName() {
    return this.state.currentPlanName;
  }

  getPlanNames() {
    return this.state.planNames;
  }
}

export default new PlansStore();
