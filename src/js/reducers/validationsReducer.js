import { fromJS, Map } from 'immutable';

import ValidationsConstants from '../constants/ValidationsConstants';
import { Validation, ValidationResult, ValidationStage } from '../immutableRecords/validations';

const initialState = Map({
  isFetching: false,
  validationStages: Map(),
  validations: Map(),
  validationResults: Map()
});

export default function validationsReducer(state = initialState, action) {
  switch(action.type) {

  case ValidationsConstants.REQUEST_STAGES: {
    return state.set('isFetching', true);
  }

  case ValidationsConstants.RECEIVE_STAGES: {
    const validationStages = fromJS(action.payload.entities.validationStages)
                             .map(stage => new ValidationStage(stage));
    const validations = fromJS(action.payload.entities.validations)
                        .map(validation => new Validation(validation));
    const validationResults = fromJS(action.payload.entities.validationResults)
                              .map(result => new ValidationResult(result));

    return state.set('validationStages', validationStages)
                .set('validations', validations)
                .set('validationResults', validationResults)
                .set('isFetching', false);
  }

  case ValidationsConstants.FETCH_VALIDATION_STAGES_FAILED:
    return state.set('isFetching', false);

  case ValidationsConstants.UPDATE_STAGE_STATUS: {
    return state.setIn(['validationStages', action.payload.uuid, 'status'],
                          action.payload.status);
  }

  case ValidationsConstants.UPDATE_VALIDATION_STATUS: {
    return state.setIn(['validations', action.payload.uuid, 'status'], action.payload.status);
  }

  default:
    return state;

  }
}
