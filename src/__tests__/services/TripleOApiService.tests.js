import when from 'when';
const TripleOApiService = require('../../js/services/TripleOApiService.js');

fdescribe('TripleOApiService', () => {

  let result;

  describe('.createPlan', () => {

    beforeEach((done) => {
      when(TripleOApiService.createPlan('foo', []).then(res => {
        result = res;
        done();
      }));
    });

    it('returns a promise', () => {
      expect(result).toBe('done');
    });
  });

});
