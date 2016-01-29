import { List, Map } from 'immutable';

import NodesConstants from '../constants/NodesConstants';

const initialState = Map({
  allFilter: '',
  registeredFilter: '',
  discoveredFilter: '',
  provisionedFilter: '',
  maintenanceFilter: '',
  all: List()
});

export default function nodesReducer(state = initialState, action) {
  switch(action.type) {

  case NodesConstants.LIST_NODES:
    return state.set('all', List(action.payload));

  default:
    return state;

  }
}
