class AuthTokenStorage {

  constructor() {
    this._createWorkerInstance();
  }

  _createWorkerInstance() {
    if(window && window.SharedWorker) {
      this.worker = new window.SharedWorker('/js/tripleo_ui_token_worker.js');
      this.worker.port.start();
    }
  }

  /**
   * Get the currently stored token ID.
   * @returns {String|Boolean} The token Id or false.
   */
  getTokenId(cb) {
    let tokenId = sessionStorage.getItem('keystoneAuthTokenId');

    // If there was a tokenId stored in sessionStorage,
    // just call the cb and leave.
    if(tokenId) {
      return cb(tokenId);
    }

    // Create callback for temporary worker message listener.
    let fn = (e) => {
      cb(e.data);
      this.worker.port.removeEventListener('message', fn);
    };
    this.worker.port.addEventListener('message', fn);
    this.worker.port.postMessage(null);
  }

  storeTokenId(tokenId) {
    sessionStorage.setItem('keystoneAuthTokenId', tokenId);
    this.worker.port.postMessage(tokenId);
  }

  removeTokenId() {
    sessionStorage.removeItem('keystoneAuthTokenId');
    if(this.worker) {
      // Post a value of false to erase the token.
      this.worker.port.postMessage(false);
    }
  }

}

export default new AuthTokenStorage();
