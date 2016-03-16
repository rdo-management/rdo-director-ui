import { List, Map } from 'immutable';
import when from 'when';

import * as utils from '../../js/services/utils';
import ParametersActions from '../../js/actions/ParametersActions';
import TripleOApiService from '../../js/services/TripleOApiService';


// Use this to mock asynchronous functions which return a promise.
// The promise will immediately resolve with `data`.
let createResolvingPromise = (data) => {
  return () => {
    return when.resolve(data);
  };
};

fdescribe('ParametersActions', () => {
  beforeEach(() => {
    spyOn(utils, 'getAuthTokenId').and.returnValue('mock-auth-token');
  });

  describe('fetchParameters', () => {
    let responseBody = {
      parameters: {
        Description: 'lorem ipsum',
        Parameters: {},
        NestedParameters: {}
      }
    };

    beforeEach(done => {
      spyOn(ParametersActions, 'fetchParametersPending');
      spyOn(ParametersActions, 'fetchParametersSuccess');
      // Mock the service call.
      spyOn(TripleOApiService, 'getPlanParameters')
        .and.callFake(createResolvingPromise(responseBody));
      // Call the action creator and the resulting action.
      // In this case, dispatch and getState are just empty placeHolders.
      ParametersActions.fetchParameters('overcloud')(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches fetchParametersPending', () => {
      expect(TripleOApiService.getPlanParameters).toHaveBeenCalledWith('overcloud');
    });

    it('dispatches fetchParametersPending', () => {
      expect(ParametersActions.fetchParametersPending).toHaveBeenCalled();
    });

    it('dispatches fetchParametersSuccess', () => {
      expect(ParametersActions.fetchParametersSuccess).toHaveBeenCalledWith(responseBody.parameters);
    });
  });
});
