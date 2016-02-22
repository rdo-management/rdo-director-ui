import { Map } from 'immutable';
import when from 'when';

import EnvironmentConfigurationActions from '../../js/actions/EnvironmentConfigurationActions';
import environmentConfigurationReducer from '../../js/reducers/environmentConfigurationReducer';
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

xdescribe('EnvironmentConfigurationActions', () => {
  // TODO(flfuchs) Add test for async actions
});
