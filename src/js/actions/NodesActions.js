import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NodesConstants from '../constants/NodesConstants';

export default {
  listNodes(nodes) {
    AppDispatcher.dispatch({
      actionType: NodesConstants.LIST_NODES,
      nodes: nodes
    });
  }
};
