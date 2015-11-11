import request from 'reqwest';
import when from 'when';

import { GET_VALIDATIONS_PATH } from '../constants/ValidationsApiConstants';
import NotificationActions from '../actions/NotificationActions';
import TempStorage from './TempStorage';
import ValidationsActions from '../actions/ValidationsActions';
import ValidationsApiErrorHandler from './ValidationsApiErrorHandler';
import { VALIDATIONS_URL } from '../constants/APIEndpointUrls';

class ValidationsApiService {
  /**
   * Validations API: GET /v1/validations/
   * @returns {array} of validations.
   */
  getValidationsRequest() {
    return when(request({
      url: VALIDATIONS_URL + GET_VALIDATIONS_PATH,
      method: 'GET',
      headers: { 'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId') },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json'
    }));
  }

  /**
   * Validations API: GET /v1/validations/<uuid>
   * @returns validation.
   */
  getValidationRequest(uuid) {
    return when(request({
      url: VALIDATIONS_URL + GET_VALIDATIONS_PATH + uuid + '/',
      method: 'GET',
      headers: { 'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId') },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json'
    }));
  }

  /**
  * Handles getValidationsRequest
  */
  getValidations() {
    this.getValidationsRequest().then((response) => {
      ValidationsActions.listValidations(response);
    }).catch((error) => {
      console.error('Error in getValidations', error);
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }
}

export default new ValidationsApiService();
