import { List, Map } from 'immutable';

import PlansConstants from '../constants/PlansConstants';

const initialState = Map({
  isFetching: false,
  conflict: undefined,
  currentPlanName: undefined,
  currentPlanFiles: List(),
  all: List()
});

export default function plansReducer(state = initialState, action) {
  switch(action.type) {

    case PlansConstants.REQUEST_PLANSLIST:
      return state.set('isFetching', true);

    case PlansConstants.RECEIVE_PLANSLIST:
      let all = [];
      if(action.payload && action.payload.plans) {
        action.payload.plans.forEach(item => {
          all.push(item.name);
        });
      }
      return state
              .set('isFetching', false)
              .set('all', List.of(...all.sort()));

    default:
      return state;
  }
}
