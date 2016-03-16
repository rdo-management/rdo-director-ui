import { normalize, arrayOf } from 'normalizr';

import history from '../history';
import NotificationActions from '../actions/NotificationActions';
import ParametersConstants from '../constants/ParametersConstants';
import TripleOApiService from '../services/TripleOApiService';
import TripleOApiErrorHandler from '../services/TripleOApiErrorHandler';

export default {
  fetchParametersPending() {
  },

  fetchParametersSuccess(parameters) {
  },

  fetchParametersFailed() {
  },

  fetchParameters(planName) {
    return dispatch => {
      dispatch(this.fetchParametersPending());
      TripleOApiService.getPlanParameters(planName).then(response => {
        dispatch(this.fetchParametersSuccess(response.parameters));
      }).catch(error => {
        // TODO(flfuchs)
      });
    };
  },

  fetchPlans() {
    return dispatch => {
      dispatch(this.requestPlans());
      TripleOApiService.getPlans().then(response => {
        let normalizedData = normalize(response.plans, arrayOf(planSchema));
        dispatch(this.receivePlans(normalizedData));
        dispatch(this.detectPlan(normalizedData));
      }).catch(error => {
        console.error('Error retrieving plans PlansActions.fetchPlans', error.stack || error); //eslint-disable-line no-console
        dispatch(this.receivePlans(normalize([], arrayOf(planSchema))));
        dispatch(this.detectPlan(normalize([], arrayOf(planSchema))));
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          dispatch(NotificationActions.notify(error));
        });
      });
    };
  },
};
