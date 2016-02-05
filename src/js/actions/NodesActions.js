import when from 'when';

import IronicApiErrorHandler from '../services/IronicApiErrorHandler';
import IronicApiService from '../services/IronicApiService';
import NodesConstants from '../constants/NodesConstants';
import NotificationActions from './NotificationActions';

export default {
  requestNodes() {
    return {
      type: NodesConstants.REQUEST_NODES
    };
  },

  receiveNodes(nodes) {
    return {
      type: NodesConstants.RECEIVE_NODES,
      payload: nodes
    };
  },

  fetchNodes() {
    return (dispatch, getState) => {
      dispatch(this.requestNodes());
      return IronicApiService.getNodes().then((response) => {
        return when.all(response.nodes.map((node) => {
          return IronicApiService.getNode(node.uuid);
        }));
      }).then((nodes) => {
        dispatch(this.receiveNodes(nodes));
      }).catch((error) => {
        dispatch(this.receiveNodes([]));
        console.error('Error in NodesActions.fetchNodes', error); //eslint-disable-line no-console
        let errorHandler = new IronicApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify(error);
        });
      });
    };
  }
};
