import { normalize, arrayOf } from 'normalizr';
import { Map } from 'immutable';

// import NotificationActions from './NotificationActions';
import RolesConstants from '../constants/RolesConstants';
import roles from '../mockData/roles';
import { roleSchema } from '../normalizrSchemas/roles';

export default {
  fetchRoles() {
    return (dispatch, getState) => {
      dispatch(this.fetchRolesPending());

      // TODO(jtomasek): Replace this with an actual action which fetches Roles from HEAT
      // fake the reques/response delay
      const normalizedRoles = normalize(roles, arrayOf(roleSchema)).entities.roles || Map();
      setTimeout(() => dispatch(this.fetchRolesSuccess(normalizedRoles)), 500);

      // TODO(jtomasek): Use this when roles are fetched from Heat
      // HeatApiService.getRoles().then((response) => {
      //   response = normalize(response, arrayOf(roleSchema));
      //   dispatch(this.fetchRolesSuccess(response));
      // }).catch((error) => {
      //   console.error('Error in RolesAction.fetchRoles', error.stack || error); //eslint-disable-line no-console
      //   dispatch(this.fetchRolesFailed());
      //   let errorHandler = new HeatApiErrorHandler(error);
      //   errorHandler.errors.forEach((error) => {
      //     dispatch(NotificationActions.notify(error));
      //   });
      // });
    };
  },

  fetchRolesPending() {
    return {
      type: RolesConstants.FETCH_ROLES_PENDING
    };
  },

  fetchRolesSuccess(roles) {
    return {
      type: RolesConstants.FETCH_ROLES_SUCCESS,
      payload: roles
    };
  },

  fetchRolesFailed() {
    return {
      type: RolesConstants.FETCH_ROLES_FAILED
    };
  }
};
