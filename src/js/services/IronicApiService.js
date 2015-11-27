import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import TempStorage from './TempStorage';
import LoginStore from '../stores/LoginStore';

class IronicApiService {
  defaultRequest(additionalAttributes) {
    return _.merge({
      headers: {
        'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId'),
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
  getNodes() {
    return when(request(this.defaultRequest(
      { url: LoginStore.getServiceUrl('ironic') + 'nodes' }
    )));
  }

  /**
   * Ironic API: GET /v1/nodes/<uuid>
   * @returns node object.
   */
  getNode(uuid) {
    return when(request(this.defaultRequest(
      { url: `${LoginStore.getServiceUrl('ironic')}nodes/${uuid}`}
    )));
  }

}

export default new IronicApiService();
