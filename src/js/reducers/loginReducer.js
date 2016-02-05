import { Map, Record, List } from 'immutable';

import LoginConstants from '../constants/LoginConstants';

const InitialState = Record({
  keystoneAccess: Map(),
  loginForm: Map({
    formErrors: List(),
    formFieldErrors: Map()
  }),
  authInProgress: false
});

const initialState = new InitialState;

export default function loginReducer(state = initialState, action) {
  switch(action.type) {

  case LoginConstants.USER_AUTH_STARTED:
    return state.set('authInProgress', true);

  case LoginConstants.USER_AUTH_SUCCESS:
    return state.set('keystoneAccess', action.payload)
                .set('authInProgress', false);

  case LoginConstants.USER_AUTH_FAILURE:
    return state.set('loginForm', action.payload)
                .set('authInProgress', false);

  case LoginConstants.LOGOUT_USER_SUCCESS:
    return initialState;

  default:
    return state;

  }
}
