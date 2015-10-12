import request from 'reqwest';
import when from 'when';

import TempStorage from './TempStorage';
import { GET_NODES_URL } from '../constants/IronicApiConstants';
import IronicApiErrorHandler from './IronicApiErrorHandler';
import NodesActions from '../actions/NodesActions';
import NotificationActions from '../actions/NotificationActions';

class IronicApiService {
  /**
   * Ironic API: GET /v1/nodes
   * @returns {array} of nodes.
   */
  getNodes(keystoneAuthTokenId) {
    return when(request({
      url: GET_NODES_URL,
      method: 'GET',
      headers: { 'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId') },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json'
    })).then((response) => {
      let nodes = response.nodes;
      NodesActions.listNodes(nodes);
    }).catch((error) => {
      console.error('Error in getNodes', error);
      let errorHandler = new IronicApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }
}

export default new IronicApiService();
