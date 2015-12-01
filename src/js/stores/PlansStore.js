import BaseStore from './BaseStore';
import PlansActions from '../actions/PlansActions';
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
    this._storeCurrentPlanName(planName);
    this.emitChange();
  }

  onListPlans(plans) {
    this.state.planNames = [];
    plans.forEach(item => {
      this.state.planNames.push(item.name);
    });
    // We don't have an active plan in the state.
    if(!this.state.currentPlanName) {
      let storedName = this._getStoredPlan(this.state);
      // There also nothing in localStorage, so let's choose the first plan from the list.
      if(!storedName) {
        console.log('no stored name');
        this.state.currentPlanName = (this.state.planNames.length > 0)
          ? this.state.planNames[0] : undefined;
      }
      // There is a plan in localStorage, so let's choose this,
      // but only if it matches with a name in the plan list.
      // If it doesn't, let's just ignore it.
      else if(this._matchesList(storedName, this.state.planNames)) {
        this.state.currentPlanName = storedName;
      }
    }
    // We have an active plan, but it doesn't match with a name in the plan list.
    // So let's unset it.
    else if(this.state.currentPlanName &&
            !this._matchesList(this.state.currentPlanName, this.state.planNames)) {
      this.state.currentPlanName = undefined;
    }
    // We do have an active plan that matches, so let's update localStorage.
    else {
      this._storeCurrentPlanName(this.state.currentPlanName);
    }
    this.emitChange();
  }

  _storeCurrentPlanName(name) {
    if(window && window.localStorage) {
      window.localStorage.setItem('currentPlanName', name);
    }
  }

  _getStoredPlan() {
    let storedName;
    if(window && window.localStorage) {
      storedName = window.localStorage.getItem('currentPlanName');
    }
    // Make sure undefined is returned instead of null.
    return (storedName === null) ? undefined : storedName;
  }

  _matchesList(name, list) {
    let matches = false;
    list.forEach(item => {
      if(name === item) {
        matches = true;
      }
    });
    return matches;
  };

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
