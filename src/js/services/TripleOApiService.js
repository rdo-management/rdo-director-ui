import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import { GET_PLANS_PATH } from '../constants/TripleOApiConstants';
// import LoginStore from '../stores/LoginStore';
import NotificationActions from '../actions/NotificationActions';
import TempStorage from './TempStorage';
import PlansActions from '../actions/PlansActions';
import TripleOApiErrorHandler from './TripleOApiErrorHandler';
import { TRIPLEOAPI_URL } from '../constants/APIEndpointUrls';

class TripleOApiService {
  constructor() {
    this.defaultGetRequest = {
      method: 'GET',
      headers: { 'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId') },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json'
    };
  }

  /**
   * TripleO API: GET /v1/plans/
   * @returns {array} of plans.
   */
  getPlans() {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: TRIPLEOAPI_URL + GET_PLANS_PATH }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>
   * @returns plan.
   */
  getPlan(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>/environments
   * @returns Plan's environments mapping.
   */
  getPlanEnvironments(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}/environments` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>/parameters
   * @returns Plan's parameters.
   */
  getPlanParameters(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}/parameters` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>/resource_types
   * @returns Plan's resource registry.
   */
  getPlanResourceTypes(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}/resource_types` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>/roles
   * @returns Plan's roles mapping.
   */
  getPlanResourceTypes(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}/roles` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>/validate
   * @returns Plan's validation results.
   */
  getPlanResourceTypes(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}/validate` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<uuid>/deploy
   */
  getPlanResourceTypes(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${uuid}/deploy` }
    )));
  }

  /**
  * Handles getPlans
  */
  handleGetPlans() {
    this.getPlans().then((response) => {
      PlansActions.listPlans(response);
    }).catch((error) => {
      console.error('Error in handleGetPlans', error);
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }
}

export default new TripleOApiService();
