import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import TempStorage from './TempStorage';
import { GET_NODES_PATH } from '../constants/IronicApiConstants';
import IronicApiErrorHandler from './IronicApiErrorHandler';
import LoginStore from '../stores/LoginStore';
import NodesActions from '../actions/NodesActions';
import NotificationActions from '../actions/NotificationActions';

class IronicApiService {
  constructor() {
    this.defaultGetRequest = {
      method: 'GET',
      headers: {
        'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId'),
        'X-OpenStack-Ironic-API-Version': '1.14'
      },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json'
    };
  }

  /**
   * Ironic API: GET /v1/nodes
   * @returns {array} of nodes.
   */
  getNodes() {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: LoginStore.getServiceUrl('ironic') + GET_NODES_PATH }
    )));
  }

  /**
   * Ironic API: GET /v1/nodes/<uuid>
   * @returns node object.
   */
  getNode(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${LoginStore.getServiceUrl('ironic')}${GET_NODES_PATH}/${uuid}`}
    )));
  }

  handleGetNodes() {
    this.getNodes().then((response) => {
      return when.all(response.nodes.map((node) => {
        return this.getNode(node.uuid);
      }));
    }).then((nodes) => {
      NodesActions.listNodes(nodes);
    }).catch((error) => {
      console.error('Error in handleGetNodes', error);
      let errorHandler = new IronicApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }
}

export default new IronicApiService();
