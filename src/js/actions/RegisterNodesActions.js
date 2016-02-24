// import when from 'when';

// import IronicApiErrorHandler from '../services/IronicApiErrorHandler';
// import IronicApiService from '../services/IronicApiService';
// import MistralApiService from '../services/MistralApiService';
// import MistralApiErrorHandler from '../services/MistralApiErrorHandler';
import RegisterNodesConstants from '../constants/RegisterNodesConstants';
// import NotificationActions from './NotificationActions';

export default {
  addNode(node) {
    return {
      type: RegisterNodesConstants.ADD_NODE,
      payload: node
    };
  },

  selectNode(id) {
    return {
      type: RegisterNodesConstants.SELECT_NODE,
      payload: id
    };
  },

  removeNode(id) {
    return {
      type: RegisterNodesConstants.REMOVE_NODE,
      payload: id
    };
  },

  updateNode(node) {
    return {
      type: RegisterNodesConstants.UPDATE_NODE,
      payload: node
    };
  }
};
