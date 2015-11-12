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
   * TripleO API: GET /v1/plans/<planName>
   * @returns plan.
   */
  getPlan(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/environments
   * @returns Plan's environments mapping.
   */
  getPlanEnvironments(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/environments` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/parameters
   * @returns Plan's parameters.
   */
  getPlanParameters(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/parameters` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/resource_types
   * @returns Plan's resource registry.
   */
  getPlanResourceTypes(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/resource_types` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/roles
   * @returns Plan's roles mapping.
   */
  getPlanResourceTypes(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/roles` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/validate
   * @returns Plan's validation results.
   */
  getPlanResourceTypes(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/validate` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/deploy
   */
  getPlanResourceTypes(planName) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/deploy` }
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
