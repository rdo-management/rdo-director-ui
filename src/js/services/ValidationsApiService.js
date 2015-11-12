import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import { GET_VALIDATIONS_PATH } from '../constants/ValidationsApiConstants';
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
   * Validations API: GET /v1/validations/
   * @returns {array} of validations.
   */
  getValidations() {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: VALIDATIONS_URL + GET_VALIDATIONS_PATH }
    )));
  }

  /**
   * Validations API: GET /v1/validations/<uuid>
   * @returns validation.
   */
  getValidation(uuid) {
    return when(request(_.merge(
      this.defaultGetRequest,
      { url: `${VALIDATIONS_URL}${GET_VALIDATIONS_PATH}${uuid}/`}
    )));
  }

  /**
  * Handles getValidations
  */
  handleGetValidations() {
    this.getValidations().then((response) => {
      ValidationsActions.listValidations(response);
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
