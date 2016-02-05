import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

class IronicApiService {
  defaultRequest(authTokenId, additionalAttributes) {
    return _.merge({
      headers: {
        'X-Auth-Token': authTokenId,
        'X-OpenStack-Ironic-API-Version': '1.14'
      },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json',
      method: 'GET'
    }, additionalAttributes);
  }

  /**
   * Ironic API: GET /v1/nodes
   * @returns {array} of nodes.
   */
  getNodes(ironicUrl, authTokenId) {
    return when(request(this.defaultRequest(authTokenId,
      {
        url: ironicUrl + '/nodes'
      }
    )));
  }

  /**
   * Ironic API: GET /v1/nodes/<uuid>
   * @returns node object.
   */
  getNode(ironicUrl, authTokenId, nodeId) {
    return when(request(this.defaultRequest(authTokenId,
      {
        url: ironicUrl + '/nodes/' + nodeId
      }
    )));
  }

}

export default new IronicApiService();
