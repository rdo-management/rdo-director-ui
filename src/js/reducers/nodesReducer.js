import { List, Map } from 'immutable';

import NodesConstants from '../constants/NodesConstants';

const initialState = Map({
  allFilter: '',
  registeredFilter: '',
  introspectedFilter: '',
  provisionedFilter: '',
  maintenanceFilter: '',
  all: List(),
  dataOperationInProgress: false
});

export default function nodesReducer(state = initialState, action) {
  switch(action.type) {

  case NodesConstants.START_NODES_OPERATION:
    return state.set('dataOperationInProgress', true);

  case NodesConstants.FINISH_NODES_OPERATION:
    return state.set('dataOperationInProgress', false);

  case NodesConstants.LIST_NODES:
    return state.set('all', List(action.payload));

  default:
    return state;

  }
}
