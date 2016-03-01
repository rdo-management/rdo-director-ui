const TempStorage = require('../../js/services/TempStorage.js');
const WORKER_URL = '/js/tripleo_ui_tempstorage_worker.js';

describe('TempStorage', () => {
  describe('.getItem', () => {
    beforeEach(() => {
      sessionStorage.removeItem('someKey');
    });

    it('returns ``null`` if no value has been set yet.', () => {
      sessionStorage.removeItem('someKey');
      expect(TempStorage.getItem('someKey')).toBeNull();
    });

    it('returns the value from sessionStorage if it is set', () => {
      sessionStorage.setItem('someKey', 'someValue');
      expect(TempStorage.getItem('someKey')).toEqual('someValue');
    });
  });

  describe('worker updates', () => {
    let worker;

    if(window && window.SharedWorker) {
      worker = new window.SharedWorker(WORKER_URL);
      worker.port.start();
    }

    beforeEach(() => {
      sessionStorage.removeItem('someKey');
    });

    it('update the sessionStorage items as well', () => {
      expect(TempStorage.getItem('someKey')).toBeNull();
      worker.port.postMessage({someKey: 'updated'});
      setTimeout(() => {
        expect(TempStorage.getItem('someKey')).toEqual('updated');
        expect(sessionStorage.getItem('someKey')).toEqual('updated');
      }, 20);
    });
  });

  describe('```.setItem```', () => {
    beforeEach(() => {
      sessionStorage.removeItem('someKey');
    });

    it('updates the worker as well as sessionStorage', () => {
      expect(TempStorage.getItem('someKey')).toBeNull();
      TempStorage.setItem('someKey', 'newVal');
      setTimeout(() => {
        expect(sessionStorage.getItem('someKey')).toBe('newVal');
      }, 50);
    });
  });
});
