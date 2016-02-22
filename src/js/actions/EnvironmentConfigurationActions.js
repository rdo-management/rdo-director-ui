import EnvironmentConfigurationConstants from '../constants/EnvironmentConfigurationConstants';
import history from '../history';
import NotificationActions from '../actions/NotificationActions';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';

export default {
  requestEnvironment() {
    return {
      type: EnvironmentConfigurationConstants.REQUEST_ENVIRONMENT
    };
  },

  receiveEnvironment(environment) {
    return {
      type: EnvironmentConfigurationConstants.RECEIVE_ENVIRONMENT,
      payload: environment
    };
  },

  fetchEnvironment(planName) {
    return dispatch => {
      dispatch(this.requestEnvironment());
      TripleOApiService.getPlanEnvironments(planName).then((response) => {
        dispatch(this.receiveEnvironment(response.environments));
      }).catch(error => {
        console.error('Error retrieving EnvironmentConfigurationActions.fetchEnvironment', error); //eslint-disable-line no-console
        dispatch(this.receiveEnvironment({ topics: [] }));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });
    };
  },

  updatingEnvironment() {
    return {
      type: EnvironmentConfigurationConstants.UPDATING_ENVIRONMENT
    };
  },

  environmentUpdated(environment) {
    return {
      type: EnvironmentConfigurationConstants.ENVIRONMENT_UPDATED,
      payload: environment
    };
  },

  updateEnvironment(planName, data, parentPath) {
    return dispatch => {
      dispatch(this.updatingEnvironment());
      TripleOApiService.updatePlanEnvironments(planName, data).then((response) => {
        dispatch(this.environmentUpdated(response.environments));
        history.pushState(null, parentPath);
        dispatch(NotificationActions.notify({
          title: 'Environment Configuration updated',
          message: 'The Environment Configuration has been successfully updated',
          type: 'success'
        }));
      }).catch((error) => {
        console.error('Error in EnvironmentConfigurationActions.updateEnvironment', error); //eslint-disable-line no-console
        dispatch(this.receiveEnvironment({ topics: [] }));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });

    };
  }

};
