import { fromJS, Map, OrderedMap } from 'immutable';

import { NodeToRegister } from '../immutableRecords/nodes';
import RegisterNodesConstants from '../constants/RegisterNodesConstants';

const initialState = Map({
  nodesToRegister: OrderedMap(),
  selectedNodeId: undefined
});

export default function registerNodesReducer(state = initialState, action) {
  switch(action.type) {

  case RegisterNodesConstants.ADD_NODE: {
    const node = action.payload;
    return state.update('nodesToRegister', nodes => nodes.set(node.id, node));
  }

  case RegisterNodesConstants.SELECT_NODE: {
    return state.set('selectedNodeId', action.payload);
  }

  case RegisterNodesConstants.REMOVE_NODE: {
    const newState = state.update('nodesToRegister', nodes => nodes.delete(action.payload));
    if (action.payload === state.get('selectedNodeId')) {
      const nodeToSelect = newState.get('nodesToRegister').last();
      return newState.set('selectedNodeId', nodeToSelect ? nodeToSelect.id : undefined);
    } else {
      return newState;
    }
  }

  case RegisterNodesConstants.UPDATE_NODE: {
    return state.updateIn(['nodesToRegister', action.payload.id],
                          node => new NodeToRegister(fromJS(action.payload)));
  }

  default:
    return state;

  }
}
