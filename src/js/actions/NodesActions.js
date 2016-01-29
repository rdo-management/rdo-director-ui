import NodesConstants from '../constants/NodesConstants';

export default {
  listNodes(nodes) {
    return {
      type: NodesConstants.LIST_NODES,
      payload: nodes
    };
  }
};
