import request from 'reqwest';
import when from 'when';

import AuthTokenStorage from './AuthTokenStorage';
import { GET_NODES_URL } from '../constants/IronicApiConstants';
// import KeystoneApiErrorHandler from './KeystoneApiErrorHandler';
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
      headers: { 'X-Auth-Token': AuthTokenStorage.getStoredTokenId() },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json'
    })).then((response) => {
      let nodes = response.nodes;
      NodesActions.listNodes(nodes);
      // return true;
    }).catch((error) => {
      console.error('Error in getNodes', error);
      // let errorHandler = new KeystoneApiErrorHandler(error);
      // errorHandler.errors.forEach((error) => {
      //   NotificationActions.notify(error);
      // });
    });
  }
}

export default new IronicApiService();
