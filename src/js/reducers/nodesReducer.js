import { List, Map } from 'immutable';

import NodesConstants from '../constants/NodesConstants';

const initialState = Map({
  isFetching: false,
  allFilter: '',
  registeredFilter: '',
  introspectedFilter: '',
  provisionedFilter: '',
  maintenanceFilter: '',
  all: List()
});

export default function nodesReducer(state = initialState, action) {
  switch(action.type) {

  case NodesConstants.REQUEST_NODES:
    return state.set('isFetching', true);

  case NodesConstants.RECEIVE_NODES:
    return state
            .set('all', List(action.payload))
            .set('isFetching', false);

  default:
    return state;

  }
}
