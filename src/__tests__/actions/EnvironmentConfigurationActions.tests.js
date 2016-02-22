import { List, Map } from 'immutable';
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

    it('`isLoaded` is false', () => {
      expect(state.get('isLoaded')).toBe(false);
    });
    it('`entity` is an empty Map', () => {
      expect(state.get('entity')).toEqual(Map({ topics: List() }));
    });
  });

  describe('fetchEnvironmentConfigurationSuccess', () => {
    let state;
    let payload = {foo: 'bar'};

    beforeEach(() => {
      state = environmentConfigurationReducer(
        undefined,
        EnvironmentConfigurationActions.fetchEnvironmentConfigurationSuccess(payload)
      );
    });

    it('sets ``isLoaded`` to false', () => {
      expect(state.get('isLoaded')).toBe(true);
    });

    it('sets ``entity``', () => {
      expect(state.get('entity')).toEqual(Map(payload));
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

  describe('fetchEnvironmentConfiguration', () => {
    beforeEach(done => {
      spyOn(EnvironmentConfigurationActions, 'fetchEnvironmentConfigurationSuccess');
      // Mock the service call.
      spyOn(TripleOApiService, 'getPlanEnvironments').and.callFake(createResolvingPromise({
        topics: []
      }));
      EnvironmentConfigurationActions.fetchEnvironmentConfiguration(
        'overcloud')(() => {}, () => {}
      );
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches fetchEnvironmentConfigurationSuccess', () => {
      expect(EnvironmentConfigurationActions.fetchEnvironmentConfigurationSuccess)
        .toHaveBeenCalled();
    });
  });

  describe('updateEnvironmentConfiguration', () => {
    beforeEach(done => {
      spyOn(EnvironmentConfigurationActions, 'updateEnvironmentConfigurationPending');
      spyOn(EnvironmentConfigurationActions, 'updateEnvironmentConfigurationSuccess');
      spyOn(history, 'pushState');
      // Mock the service call.
      spyOn(TripleOApiService, 'updatePlanEnvironments').and.callFake(createResolvingPromise({
        topics: []
      }));
      EnvironmentConfigurationActions.updateEnvironmentConfiguration(
        'overcloud', {}, '/redirect/url')(() => {}, () => {}
      );
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches updatingEnvironmentConfiguration', () => {
      expect(EnvironmentConfigurationActions.updateEnvironmentConfigurationPending)
        .toHaveBeenCalled();
    });

    it('dispatches environmentConfigurationUpdated', () => {
      expect(EnvironmentConfigurationActions.updateEnvironmentConfigurationSuccess)
        .toHaveBeenCalled();
    });

    it('redirects the page', () => {
      expect(history.pushState).toHaveBeenCalledWith(null, '/redirect/url');
    });
  });
});
