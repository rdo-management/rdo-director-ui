import { List } from 'immutable';

import EnvironmentConfigurationActions from '../../js/actions/EnvironmentConfigurationActions';
import EnvironmentConfigurationConstants
  from '../../js/constants/EnvironmentConfigurationConstants';
import environmentConfigurationReducer from '../../js/reducers/environmentConfigurationReducer';
import { InitialEnvironmentConfigurationState }
  from '../../js/immutableRecords/environmentConfiguration';

const initialState = new InitialEnvironmentConfigurationState;

describe('environmentConfigurationReducer', () => {
  describe('default state', () => {
    let state;

    beforeEach(() => {
      state = environmentConfigurationReducer(initialState, {type: 'undefined-action'});
    });

    it('`isLoaded` is false', () => {
      expect(state.get('isLoaded')).toBe(false);
    });
    it('`topics` is an empty List', () => {
      expect(state.get('topics')).toEqual(List());
    });
  });

  describe('fetchEnvironmentConfigurationPending', () => {
    let newState;
    let action = {
      type: EnvironmentConfigurationConstants.FETCH_ENVIRONMENT_CONFIGURATION_PENDING
    };

    beforeEach(() => {
      newState = environmentConfigurationReducer(initialState, action);
    });

    it('resets the state to initialState and starts loading', () => {
      expect(newState.isLoaded).toBe(false);
      expect(newState.topics).toEqual(initialState.topics);
      expect(newState.form).toEqual(initialState.form);
    });
  });

  describe('fetchEnvironmentConfigurationSuccess', () => {
    let state;
    let payload = { topics: ['bar'] };

    beforeEach(() => {
      state = environmentConfigurationReducer(
        undefined,
        EnvironmentConfigurationActions.fetchEnvironmentConfigurationSuccess(payload)
      );
    });

    it('sets ``isLoaded`` to true', () => {
      expect(state.isLoaded).toBe(true);
    });

    it('sets ``topics``', () => {
      expect(state.get('topics')).toEqual(List(payload.topics));
    });
  });
});
