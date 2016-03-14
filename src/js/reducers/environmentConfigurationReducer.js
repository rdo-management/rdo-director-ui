import { fromJS, List, Map } from 'immutable';

import EnvironmentConfigurationConstants from '../constants/EnvironmentConfigurationConstants';

const initialState = Map({
  isLoaded: false,
  entity: Map({
    topics: List()
  })
});

export default function environmentConfigurationReducer(state = initialState, action) {
  switch(action.type) {

  case EnvironmentConfigurationConstants.FETCH_ENVIRONMENT_CONFIGURATION_PENDING:
    return state.set('isLoaded', false);

  case EnvironmentConfigurationConstants.FETCH_ENVIRONMENT_CONFIGURATION_SUCCESS:
    return state
        .set('isLoaded', true)
        .set('entity', fromJS(action.payload));

  case EnvironmentConfigurationConstants.UPDATE_ENVIRONMENT_CONFIGURATION_SUCCESS:
    return state.set('entity', fromJS(action.payload));

  default:
    return state;

  }
}
