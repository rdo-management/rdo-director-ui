import BaseHttpRequestErrorHandler from '../components/utils/BaseHttpRequestErrorHandler';

export default class MistralApiErrorHandler extends BaseHttpRequestErrorHandler {
  _generateErrors(xmlHttpRequestError) {
    let errors = [];
    let error;
    switch(xmlHttpRequestError.status) {
    case 0:
      errors.push({
        title: 'Connection Error',
        message: 'Connection to Mistral API is not available'
      });
      break;
    case 401:
      error = JSON.parse(xmlHttpRequestError.responseText).error;
      errors.push({
        title: 'Unauthorized',
        message: error.message
      });
      break;
    default:
      error = JSON.parse(xmlHttpRequestError.responseText);
      errors.push({
        title: xmlHttpRequestError.statusText,
        message: error.faultstring
      });
      break;
    }
    return errors;
  }
}
