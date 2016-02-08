import { List, Map } from 'immutable';

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
    return state.set('currentPlanName', action.payload);

  default:
    return state;

  }
}
