export default class BaseErrorHandler{
  /*
    This class implements base for Api and Form error handling.
  */

  constructor(xmlHttpRequestError, formInputFieldNames) {
    this.xmlHttpRequestError = xmlHttpRequestError;
    this.formInputFieldNames = formInputFieldNames || [];
    this._errors = this._generateErrors();
    this._formFieldErrors = this._generateFormFieldErrors();
  }

  _generateErrors() {
    /*\
      returns array of error objects
    */
    return [];
  }

  _generateFormFieldErrors() {
    /*
      returns errors hash with form field names as keys and error messages as
      values. e.g. {'username': 'Username does not exist'}
    */
    return {};
  }

  get errors() {
    return this._errors;
  }

  get formFieldErrors() {
    return this._formFieldErrors;
  }
}
