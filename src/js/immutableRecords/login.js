import { List, Map, Record } from 'immutable';

export const InitialLoginState = Record({
  keystoneAccess: Map(),
  loginForm: Map({
    formErrors: List(),
    formFieldErrors: Map()
  }),
  authInProgress: false
});
