import { Map } from 'immutable';
import when from 'when';

import * as utils from '../../js/services/utils';
import EnvironmentConfigurationActions from '../../js/actions/EnvironmentConfigurationActions';
import environmentConfigurationReducer from '../../js/reducers/environmentConfigurationReducer';
import history from '../../js/history';
import TripleOApiService from '../../js/services/TripleOApiService';

describe('environmentConfigurationReducer', () => {
  describe('default state', () => {
    let state;

    beforeEach(() => {
      state = environmentConfigurationReducer(undefined, {type: 'undefined-action'});
    });

    it('`environmentConfigurationLoaded` is false', () => {
      expect(state.get('environmentConfigurationLoaded')).toBe(false);
    });

    it('`isUpdatingEnvironment` is false', () => {
      expect(state.get('isUpdatingEnvironment')).toBe(false);
    });
    it('`currentEnvironment` is an empty Map', () => {
      expect(state.get('currentEnvironment')).toEqual(Map({ topics: [] }));
    });
  });

  describe('REQUEST_ENVIRONMENT', () => {
    it('sets isFetchingEnvironment to true', () => {
      let state = environmentConfigurationReducer(
        undefined,
        EnvironmentConfigurationActions.requestEnvironment('some-plan')
      );
      expect(state.get('environmentConfigurationLoaded')).toBe(false);
    });
  });

  describe('RECEIVE_ENVIRONMENT', () => {
    let state;
    let payload = {foo: 'bar'};

    beforeEach(() => {
      state = environmentConfigurationReducer(
        undefined,
        EnvironmentConfigurationActions.receiveEnvironment(payload)
      );
    });

    it('sets ``environmentConfigurationLoaded`` to false', () => {
      expect(state.get('environmentConfigurationLoaded')).toBe(true);
    });

    it('sets ``currentEnvironment``', () => {
      expect(state.get('currentEnvironment')).toEqual(Map(payload));
    });
  });
});

// Use this to mock asynchronous functions which return a promise.
// The promise will immediately resolve with `data`.
let createResolvingPromise = (data) => {
  return () => {
    return when.resolve(data);
  };
};

describe('EnvironmentConfigurationActions', () => {
  beforeEach(() => {
    spyOn(utils, 'getAuthTokenId').and.returnValue('mock-auth-token');
  });

  describe('fetchEnvironment', () => {
    beforeEach(done => {
      spyOn(EnvironmentConfigurationActions, 'requestEnvironment');
      spyOn(EnvironmentConfigurationActions, 'receiveEnvironment');
      // Mock the service call.
      spyOn(TripleOApiService, 'getPlanEnvironments').and.callFake(createResolvingPromise({
        topics: []
      }));
      EnvironmentConfigurationActions.fetchEnvironment('overcloud')(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches requestEnvironment', () => {
      expect(EnvironmentConfigurationActions.requestEnvironment).toHaveBeenCalled();
    });

    it('dispatches receiveEnvironment', () => {
      expect(EnvironmentConfigurationActions.receiveEnvironment).toHaveBeenCalled();
    });
  });

  describe('updateEnvironment', () => {
    beforeEach(done => {
      spyOn(EnvironmentConfigurationActions, 'updatingEnvironment');
      spyOn(EnvironmentConfigurationActions, 'environmentUpdated');
      spyOn(history, 'pushState');
      // Mock the service call.
      spyOn(TripleOApiService, 'updatePlanEnvironments').and.callFake(createResolvingPromise({
        topics: []
      }));
      EnvironmentConfigurationActions.updateEnvironment('overcloud', {}, '/redirect/url')(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches updatingEnvironment', () => {
      expect(EnvironmentConfigurationActions.updatingEnvironment).toHaveBeenCalled();
    });

    it('dispatches environmentUpdated', () => {
      expect(EnvironmentConfigurationActions.environmentUpdated).toHaveBeenCalled();
    });

    it('redirects the page', () => {
      expect(history.pushState).toHaveBeenCalledWith(null, '/redirect/url');
    });
  });
});
