import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import { TRIPLEOAPI_URL } from '../constants/APIEndpointUrls';

class TripleOApiService {

  defaultRequest(authTokenId, additionalAttributes) {
    return _.merge({
      headers: { 'X-Auth-Token': authTokenId },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json',
      method: 'GET'
    }, additionalAttributes);
  }

  /**
   * TripleO API: GET /v1/plans/
   * @returns {Promise} resolving with {array} of plans.
   */
  getPlans(authTokenId) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: TRIPLEOAPI_URL + '/plans' }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>
   * @returns plan.
   */
  getPlan(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: `${TRIPLEOAPI_URL}/plans/${planName}` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/environments
   * @returns Plan's environments mapping.
   */
  getPlanEnvironments(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: `${TRIPLEOAPI_URL}/plans/${planName}/environments` }
    )));
  }

  /**
   * TripleO API: PATCH /v1/plans/<planName>/environments
   * @returns Plan's environments mapping.
   */
  updatePlanEnvironments(authTokenId, planName, data) {
    return when(request(this.defaultRequest(
      authTokenId,
      {
        url: `${TRIPLEOAPI_URL}/plans/${planName}/environments`,
        method: 'PATCH',
        data: JSON.stringify(data)
      }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/parameters
   * @returns Plan's parameters.
   */
  getPlanParameters(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: `${TRIPLEOAPI_URL}/plans/${planName}/parameters` }
    )));
  }

  /**
   * TripleO API: PATCH /v1/plans/<planName>/parameters
   * @returns Plan's parameters.
   */
  updatePlanParameters(authTokenId, planName, data) {
    return when(request(this.defaultRequest(
      authTokenId,
      {
        url: `${TRIPLEOAPI_URL}/plans/${planName}/parameters`,
        method: 'PATCH',
        data: JSON.stringify(data)
      }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/resource_types
   * @returns Plan's resource registry.
   */
  getPlanResourceTypes(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: `${TRIPLEOAPI_URL}/plans/${planName}/resource_types` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/roles
   * @returns Plan's roles mapping.
   */
  getPlanRoles(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: `${TRIPLEOAPI_URL}/plans/${planName}/roles` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/validate
   * @returns Plan's validation results.
   */
  validatePlan(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      { url: `${TRIPLEOAPI_URL}/plans/${planName}/validate` }
    )));
  }

  /**
   * TripleO API: PUT /v1/plans/<planName>/deploy
   */
  deployPlan(authTokenId, planName) {
    return when(request(this.defaultRequest(
      authTokenId,
      {
        url: `${TRIPLEOAPI_URL}/plans/${planName}/deploy`,
        method: 'PUT'
      }
    )));
  }

  /**
   * TripleO API: POST /v1/plans
   */
  createPlan(authTokenId, name, files) {
    return when(request(this.defaultRequest(
      authTokenId,
      {
        url: `${TRIPLEOAPI_URL}/plans`,
        data: JSON.stringify({
          name: name,
          files: files
        }),
        method: 'POST'
      }
    )));
  }

  /**
   * TripleO API: PATCH /v1/plans/<name>
   */
  updatePlan(authTokenId, name, files) {
    return when(request(this.defaultRequest(
      authTokenId,
      {
        url: `${TRIPLEOAPI_URL}/plans/${name}`,
        data: JSON.stringify({
          files: files
        }),
        method: 'PATCH'
      }
    )));
  }

  /**
   * TripleO API: DELETE /v1/plans/<name>
   */
  deletePlan(authTokenId, name) {
    return when(request(this.defaultRequest(
      authTokenId,
      {
        url: `${TRIPLEOAPI_URL}/plans/${name}`,
        method: 'DELETE'
      }
    )));
  }
}

export default new TripleOApiService();
