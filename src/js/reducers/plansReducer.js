import { List, Map } from 'immutable';
import * as _ from 'lodash';

import PlansConstants from '../constants/PlansConstants';

const initialState = Map({
  isFetchingPlans: false,
  isFetchingPlan: false,
  isDeletingPlan: false,
  conflict: undefined,
  currentPlanName: undefined,
  planData: Map(),
  all: List()
});

export default function plansReducer(state = initialState, action) {
  switch(action.type) {

  case PlansConstants.REQUEST_PLAN:
    return state.set('isFetchingPlan', true);

  case PlansConstants.RECEIVE_PLAN:
    return state
        .setIn(['planData', action.payload.name], action.payload)
        .set('isFetchingPlan', false);

  case PlansConstants.REQUEST_PLANS:
    return state.set('isFetchingPlans', true);

  case PlansConstants.RECEIVE_PLANS:
    return state
            .set('isFetchingPlans', false)
            .set('all', List(action.payload).map(plan => plan.name).sort());

  case PlansConstants.CHOOSE_PLAN:
    storePlan(action.payload);
    return state.set('currentPlanName', action.payload);

  case PlansConstants.DETECT_PLAN:
    let [currentPlanName, conflict] = detectPlan(state);
    return state
            .set('currentPlanName', currentPlanName)
            .set('conflict', conflict);

  default:
    return state;

  }
}

function detectPlan(state) {
  let conflict;
  let currentPlanName = state.get('currentPlanName');
  let previousPlan = state.get('currentPlanName') || getStoredPlan();
  // No plans present.
  if(state.get('all').size < 1 ) {
    if(!previousPlan) {
      currentPlanName = undefined;
    }
  }
  // Plans present.
  // No previously chosen plan.
  else if(!previousPlan) {
    currentPlanName = state.get('all')[0];
  }
  // Previously chosen plan doesn't exist any more.
  else if(!_.includes(state.get('all').toJS(), previousPlan)) {
    conflict = previousPlan;
    currentPlanName = state.get('all')[0];
  }
  // No plan in state, but in localStorage
  else if(!state.get('currentPlanName') && previousPlan) {
    currentPlanName = previousPlan;
  }
  storePlan(currentPlanName);
  return [currentPlanName, conflict];
}

function storePlan(name) {
  if(window && window.localStorage) {
    if(!name) {
      window.localStorage.removeItem('currentPlanName');
    }
    else {
      window.localStorage.setItem('currentPlanName', name);
    }
  }
}

function getStoredPlan() {
  if(window && window.localStorage) {
    return window.localStorage.getItem('currentPlanName');
  }
  return null;
}
