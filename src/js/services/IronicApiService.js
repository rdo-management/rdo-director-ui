import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

class IronicApiService {
  defaultRequest(url, authTokenId, additionalAttributes) {
    return _.merge({
      url: url,
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
  getNodes(url, authTokenId) {
    return when(request(this.defaultRequest(url, authTokenId)));
  }

  /**
   * Ironic API: GET /v1/nodes/<uuid>
   * @returns node object.
   */
  getNode(url, authTokenId) {
    return when(request(this.defaultRequest(url, authTokenId)));
  }

}

export default new IronicApiService();
