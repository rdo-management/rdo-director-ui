import { List, Map, Record } from 'immutable';

export const InitialEnvironmentConfigurationState = Record({
  isLoaded: false,
  topics: List(),
  form: Map({
    formErrors: List(),
    formFieldErrors: Map()
  })
});
