import NodesConstants from '../constants/NodesConstants';

export default {
  startOperation() {
    return {
      type: NodesConstants.START_NODES_OPERATION
    };
  },

  finishOperation() {
    return {
      type: NodesConstants.FINISH_NODES_OPERATION
    };
  },

  listNodes(nodes) {
    return {
      type: NodesConstants.LIST_NODES,
      payload: nodes
    };
  }
};
