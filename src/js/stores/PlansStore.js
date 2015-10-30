import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      plan: {
      },
      planNames: []
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case PlansConstants.GET_PLAN:
      this.onGetPlan(payload.plan);
      break;
    case PlansConstants.LIST_PLANS:
      this.onListPlans(payload.plans);
      break;
    default:
      break;
    }
  }

  onGetPlan(plan) {
    plan = plan || {}
    this.state.plan = plan;
    this.emitChange();
  }

  onListPlans(planNames) {
    planNames = planNames || [];
    this.state.planNames = planNames;
    this.emitChange();
  }

  getState() {
    return this.state;
  }

  /**
   * Returns a plan obj, either by name or current
   * (if name is omitted).
   */
  getPlan() {
    return this.state.plan;
  }

  getPlanName() {
    return this.state.plan.name;
  }

  getPlanNames() {
    return this.state.planNames;
  }
}

export default new PlansStore();
