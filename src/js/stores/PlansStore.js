import * as _ from 'lodash';

import BaseStore from './BaseStore';
import PlansConstants from '../constants/PlansConstants';

class PlansStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      currentPlanName: undefined,
      plans: [],
      plansLoaded: false,
      conflict: undefined
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
    case PlansConstants.DELETING_PLAN:
      this.onDeletingPlan(payload.planName);
      break;
    case PlansConstants.PLAN_DELETED:
      this.onPlanDeleted(payload.planName);
      break;
    default:
      break;
    }
  }

  onGetPlan(planName) {
    this.state.currentPlanName = planName;
    if(window && window.localStorage) {
      window.localStorage.setItem('currentPlanName', planName);
    }
    this.emitChange();
  }

  onListPlans(plans) {
    this.state.plans = plans;
    this.state.plansLoaded = true;
    this.emitChange();
  }

  onDeletingPlan(planName) {
    let index = _.findIndex(this.state.plans, 'name', planName);
    this.state.plans[index].transition = 'deleting';
    this.emitChange();
  }

  onPlanDeleted(planName) {
    let index = _.findIndex(this.state.plans, 'name', planName);
    this.state.plans = _.without(this.state.plans, this.state.plans[index]);
    this.emitChange();
  }

  getState() {
    return this.state;
  }

  getCurrentPlanName() {
    return this.state.currentPlanName;
  }

  getPlans() {
    return this.state.plans;
  }

  _getPreviousPlan() {
    return this.state.currentPlanName || this.getStoredPlan();
  }
}

export default new PlansStore();
