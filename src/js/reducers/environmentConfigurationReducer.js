import { Map } from 'immutable';

import EnvironmentConfigurationConstants from '../constants/EnvironmentConfigurationConstants';

const initialState = Map({
  isUpdatingEnvironment: false,
  environmentConfigurationLoaded: false,
  currentEnvironment: Map({
    topics: []
  })
});

export default function environmentConfigurationReducer(state = initialState, action) {
  switch(action.type) {

  case EnvironmentConfigurationConstants.REQUEST_ENVIRONMENT:
    return state.set('environmentConfigurationLoaded', false);

  case EnvironmentConfigurationConstants.RECEIVE_ENVIRONMENT:
    return state
        .set('environmentConfigurationLoaded', true)
        .set('currentEnvironment', Map(action.payload));

  case EnvironmentConfigurationConstants.UPDATING_ENVIRONMENT:
    return state.set('isUpdatingEnvironment', true);

  case EnvironmentConfigurationConstants.ENVIRONMENT_UPDATED:
    return state
            .set('isUpdatingEnvironment', false)
            .set('currentEnvironment', Map(action.payload));

  default:
    return state;

  }
}
