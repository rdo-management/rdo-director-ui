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
      conflict: undefined
    };
    this.detectPlan = this._detectPlan.bind(this);
    this.storePlan = this._storePlan.bind(this);
    this.getStoredPlan = this._getStoredPlan.bind(this);
    this.getPreviousPlan = this._getPreviousPlan.bind(this);
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
    this.detectPlan();
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

  _detectPlan() {
    let previousPlan = this._getPreviousPlan();
    // No plans present.
    if(this.state.plans.length < 1) {
      if(!previousPlan) {
        return;
      }
    }
    // Plans present.
    // No previously chosen plan.
    else if(!previousPlan) {
      this.state.currentPlanName = this.state.plans[0].name;
      this.storePlan(this.state.plans[0].name);
    }
    // Previously chosen plan doesn't exist any more.
    else if(!_.includes(_.pluck(this.state.plans, 'name'), previousPlan)) {
      this.state.conflict = previousPlan;
      this.state.currentPlanName = this.state.plans[0].name;
      this.storePlan(this.state.plans[0].name);
    }
    // No plan in state, but in localStorage
    else if(!this.state.currentPlanName && previousPlan) {
      this.state.currentPlanName = previousPlan;
      this.storePlan(previousPlan);
    }
  }

  _getPreviousPlan() {
    return this.state.currentPlanName || this.getStoredPlan();
  }

  _storePlan(name) {
    if(window && window.localStorage) {
      window.localStorage.setItem('currentPlanName', name);
    }
  }

  _getStoredPlan() {
    if(window && window.localStorage) {
      return window.localStorage.getItem('currentPlanName');
    }
    return null;
  }
}

export default new PlansStore();
