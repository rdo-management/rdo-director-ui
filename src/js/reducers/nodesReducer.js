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
    console.log('start_nodes_operation');
    return state.set('dataOperationInProgress', true);

  case NodesConstants.FINISH_NODES_OPERATION:
    console.log('finish_nodes_operation');
    return state.set('dataOperationInProgress', false);

  case NodesConstants.LIST_NODES:
    console.log('list_nodes');
    return state.set('all', List(action.payload));

  default:
    return state;

  }
}
