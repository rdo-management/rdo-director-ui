import EnvironmentConfigurationConstants from '../constants/EnvironmentConfigurationConstants';
import history from '../history';
import NotificationActions from '../actions/NotificationActions';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';

export default {

  fetchEnvironmentConfigurationSuccess(environment) {
    return {
      type: EnvironmentConfigurationConstants.FETCH_ENVIRONMENT_CONFIGURATION_SUCCESS,
      payload: environment
    };
  },

  fetchEnvironmentConfiguration(planName) {
    return dispatch => {
      TripleOApiService.getPlanEnvironments(planName).then((response) => {
        dispatch(this.fetchEnvironmentConfigurationSuccess(response.environments));
      }).catch(error => {
        console.error('Error retrieving EnvironmentConfigurationActions.fetchEnvironment', error); //eslint-disable-line no-console
        dispatch(this.fetchEnvironmentConfigurationSuccess({ topics: [] }));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });
    };
  },

  updateEnvironmentConfigurationPending() {
    return {
      type: EnvironmentConfigurationConstants.UPDATE_ENVIRONMENT_CONFIGURATION_PENDING
    };
  },

  updateEnvironmentConfigurationSuccess(environment) {
    return {
      type: EnvironmentConfigurationConstants.UPDATE_ENVIRONMENT_CONFIGURATION_SUCCESS,
      payload: environment
    };
  },

  updateEnvironmentConfiguration(planName, data, parentPath) {
    return dispatch => {
      dispatch(this.updateEnvironmentConfigurationPending());
      TripleOApiService.updatePlanEnvironments(planName, data).then((response) => {
        dispatch(this.updateEnvironmentConfigurationSuccess(response.environments));
        history.pushState(null, parentPath);
        dispatch(NotificationActions.notify({
          title: 'Environment Configuration updated',
          message: 'The Environment Configuration has been successfully updated',
          type: 'success'
        }));
      }).catch((error) => {
        console.error('Error in EnvironmentConfigurationActions.updateEnvironment', error); //eslint-disable-line no-console
        dispatch(this.updateEnvironmentConfigurationSuccess({ topics: [] }));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });

    };
  }

};
