import BaseErrorHandler from '../components/utils/BaseErrorHandler';

export default class KeystoneApiErrorHandler extends BaseErrorHandler {
  _generateErrors() {
    let errors = [];
    let error = JSON.parse(this.xmlHttpRequestError.responseText).error;
    switch(this.xmlHttpRequestError.status) {
    case 401:
      errors.push({
        title: 'Unauthorized',
        message: error.message
      });
      break;
    default:
      break;
    }
    return errors;
  }

  // TODO(jtomasek): remove this, I am leaving this here just for example reasons
  // this function should be implemented by form related subclass.
  _generateFormFieldErrors() {
    return {};
  }
}
