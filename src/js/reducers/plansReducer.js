import { List, Map } from 'immutable';

import PlansConstants from '../constants/PlansConstants';

const initialState = Map({
  isFetchingPlans: false,
  isFetchingPlan: false,
  isFetchingPlanDelete: false,
  conflict: undefined,
  currentPlanName: undefined,
  planData: Map(),
  all: List()
});

export default function plansReducer(state = initialState, action) {
  let newState;
  switch(action.type) {

  case PlansConstants.REQUEST_PLAN:
    return state.set('isFetchingPlan', true);

  case PlansConstants.RECEIVE_PLAN:
    newState = state.setIn(['planData', action.payload.name], action.payload);
    return newState.set('isFetchingPlan', false)

  case PlansConstants.REQUEST_PLANS:
    return state.set('isFetchingPlans', true);

  case PlansConstants.RECEIVE_PLANS:
    let all = [];
    action.payload.forEach(item => {
      all.push(item.name);
    });
    return state
            .set('isFetchingPlans', false)
            .set('all', List.of(...all.sort()));

  default:
    return state;

  }
}
