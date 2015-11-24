import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import { GET_PLANS_PATH } from '../constants/TripleOApiConstants';
// import LoginStore from '../stores/LoginStore';
import NotificationActions from '../actions/NotificationActions';
import TempStorage from './TempStorage';
import TripleOApiErrorHandler from './TripleOApiErrorHandler';
import { TRIPLEOAPI_URL } from '../constants/APIEndpointUrls';

class TripleOApiService {

  defaultRequest(additionalAttributes) {
    return _.merge({
      headers: { 'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId') },
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
  getPlans() {
    return when(request(this.defaultRequest(
      { url: TRIPLEOAPI_URL + GET_PLANS_PATH }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>
   * @returns plan.
   */
  getPlan(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/environments
   * @returns Plan's environments mapping.
   */
  getPlanEnvironments(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/environments` }
    )));
  }

  /**
   * TripleO API: PATCH /v1/plans/<planName>/environments
   * @returns Plan's environments mapping.
   */
  updatePlanEnvironments(planName, data) {
    return when(request(this.defaultRequest(
      {
        url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/environments`,
        method: 'PATCH',
        data: JSON.stringify(data)
      }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/parameters
   * @returns Plan's parameters.
   */
  getPlanParameters(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/parameters` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/resource_types
   * @returns Plan's resource registry.
   */
  getPlanResourceTypes(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/resource_types` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/roles
   * @returns Plan's roles mapping.
   */
  getPlanResourceTypes(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/roles` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/validate
   * @returns Plan's validation results.
   */
  getPlanResourceTypes(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/validate` }
    )));
  }

  /**
   * TripleO API: GET /v1/plans/<planName>/deploy
   */
  getPlanResourceTypes(planName) {
    return when(request(this.defaultRequest(
      { url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${planName}/deploy` }
    )));
  }

  _getPlanFilesObj(files) {
    let planFiles = {};
    files.forEach(item => {
      planFiles[item.name] = {};
      planFiles[item.name].contents = item.content;

      // TODO(jtomasek): user can identify capabilities-map in the list of files
      // (dropdown select or sth)
      if(item.name === 'capabilities_map.yaml') {
        planFiles[item.name].meta = { 'file-type': 'capabilities-map' };
      }
    });
    return planFiles;
  }

  /**
   * TripleO API: POST /v1/plans
   */
  createPlan(name, files) {
    let payload = JSON.stringify({
      name: name,
      files: this._getPlanFilesObj(files)
    });
    return when(request(this.defaultRequest(
      {
        url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}`,
        data: payload,
        method: 'POST'
      }
    ))).then(result => {
      NotificationActions.notify({
        title: 'Plan Created',
        message: 'The plan ' + name + ' was successfully created.',
        type: 'success'
      });
    }).catch(error => {
      console.error('Error in TripleOApiService.createPlan', error);
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify({
          title: 'Error Creating Plan',
          message: `The plan ${name} could not be created. ${error.message}`,
          type: 'error'
        });
      });
    });
  }

  /**
   * TripleO API: PATCH /v1/plans/<name>
   */
  updatePlan(name, files) {
    let payload = JSON.stringify({
      files: this._getPlanFilesObj(files)
    });
    return when(request(this.defaultRequest(
      {
        url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${name}`,
        data: payload,
        method: 'PATCH'
      }
    ))).then(result => {
      NotificationActions.notify({
        title: 'Plan Updated',
        message: 'The plan ' + name + ' was successfully updated.',
        type: 'success'
      });
    }).catch(error => {
      console.error('Error in TripleOApiService.updatePlan', error);
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify({
          title: 'Error Updating Plan',
          message: `The plan ${name} could not be updated. ${error.message}`,
          type: 'error'
        });
      });
    });
  }

  /**
   * TripleO API: DELETE /v1/plans/<name>
   */
  deletePlan(name) {
    return when(request(this.defaultRequest(
      {
        url: `${TRIPLEOAPI_URL}${GET_PLANS_PATH}/${name}`,
        method: 'DELETE'
      }
    ))).then(result => {
      NotificationActions.notify({
        title: 'Plan Deleted',
        message: 'The plan ' + name + ' was successfully deleted.',
        type: 'success'
      });
    }).catch(error => {
      console.error('Error in TripleOApiService.updatePlan', error);
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify({
          title: 'Error Deleting Plan',
          message: `The plan ${name} could not be deleted. ${error.message}`,
          type: 'error'
        });
      });
    });
  }
}

export default new TripleOApiService();
