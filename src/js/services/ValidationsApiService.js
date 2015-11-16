import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import NotificationActions from '../actions/NotificationActions';
import TempStorage from './TempStorage';
import ValidationsActions from '../actions/ValidationsActions';
import ValidationsApiErrorHandler from './ValidationsApiErrorHandler';
import { VALIDATIONS_URL } from '../constants/APIEndpointUrls';

class ValidationsApiService {
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
   * Validations API: GET /v1/plans/<planId>/validations/
   * @returns {array} of validations.
   */
  getValidations(planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}/plans/${planId}/validations/` }
    )));
  }

  /**
   * Validations API: GET /v1/plans/<planId>/validations/<validationId>
   * @returns validation.
   */
  getValidation(validationId, planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}/plans/${planId}/validations/${validationId}/` }
    )));
  }

  /**
   * Validations API: PUT /v1/plans/<plan_id>/validations/<validation_id>/run
   */
  runValidation(validationId, planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { method: 'PUT',
        url: `${VALIDATIONS_URL}/plans/${planId}/validations/${validationId}/run` }
    )));
  }

  /**
   * Validations API: PUT /v1/plans/<plan_id>/validations/<validation_id>/stop
   */
  stopValidation(validationId, planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { method: 'PUT',
        url: `${VALIDATIONS_URL}/plans/${planId}/validations/${validationId}/stop` }
    )));
  }

  /**
   * Validations API: GET /v1/plans/<planId>/validation_types/
   * @returns Validation Types.
   */
  getValidationTypes(planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}/plans/${planId}/validation_types/` }
    )));
  }

  /**
   * Validations API: GET /v1/plans/<planId>/validation_types/<type_uuid>/
   * @returns Validation Type.
   */
  getValidationType(validationTypeId, planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}/plans/${planId}/validation_types/${validationTypeId}/` }
    )));
  }

  /**
   * Validations API: PUT /v1/plans/<planId>/validation_types/<type_uuid>/run
   */
  runValidationType(validationTypeId, planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { method: 'PUT',
        url: `${VALIDATIONS_URL}/plans/${planId}/validation_types/${validationTypeId}/run` }
    )));
  }

  /**
   * GET /v1/plans/<planId>/validation_results/
   * @returns array of validation results
   */
  getValidationResults(planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}/plans/${planId}/validation_results/` }
    )));
  }

  /**
   * GET /v1/plans/<planId>/validation_results/<result_id>/
   * @returns validation result
   */
  getValidationResult(resultId, planId) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}/plans/${planId}/validation_results/${resultId}/` }
    )));
  }

  /**
  * Handles getValidations
  */
  handleGetValidations() {
    this.getValidationTypes().then((response) => {
      ValidationsActions.listValidationTypes(response);
    }).catch((error) => {
      console.error('Error in handleGetValidations', error);
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }
}

export default new ValidationsApiService();
