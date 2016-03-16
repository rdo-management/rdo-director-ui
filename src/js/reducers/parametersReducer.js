import { List, Map } from 'immutable';

import ParametersConstants from '../constants/ParametersConstants';
import { Parameter,
         ParametersDefaultState } from '../immutableRecords/parameters';

const initialState = new ParametersDefaultState();

export default function parametersReducer(state = initialState, action) {
  switch(action.type) {

  case ParametersConstants.FETCH_PARAMETERS_PENDING:
    return state
            .set('isPending', true)
            .set('form', Map({ formErrors: List(), formFieldErrors: Map() }))
            .set('parameters', Map());

  case ParametersConstants.FETCH_PARAMETERS_SUCCESS:
    return state
            .set('isPending', false)
            .set('form', Map({
              formErrors: List(),
              formFieldErrors: Map()
            }))
            .set('parameters', Map({
              Description: action.payload.Description,
              NestedParameters: deepAddParameterRecords(action.payload.NestedParameters),
              Parameters: deepAddParameterRecords(action.payload.Parameters)
            }));

  case ParametersConstants.FETCH_PARAMETERS_FAILED:
    return state.set('isPending', false);

  case ParametersConstants.UPDATE_PARAMETERS_PENDING:
    return state.set('isPending', true);

  case ParametersConstants.UPDATE_PARAMETERS_SUCCESS:
    return state
            .set('isPending', false)
            .set('form', Map({
              formErrors: List(),
              formFieldErrors: Map()
            }))
            .set('parameters', Map({
              Description: action.payload.Description,
              NestedParameters: deepAddParameterRecords(action.payload.NestedParameters),
              Parameters: deepAddParameterRecords(action.payload.Parameters)
            }));
  case ParametersConstants.UPDATE_PARAMETERS_FAILED:
    // TODO(flfuchs) Handle failed state.
    return state

  default:
    return state;

  }
}

/**
 * Replaces all Parameters/NestedParameters items with Parameter Records.
 */
const deepAddParameterRecords = parameters => {
  if(!parameters) {
    return undefined;
  }
  let data = {};
  Map(parameters).map((parameter, key) => {
    data[key] = new Parameter(parameter).set('Name', key);
    let params = deepAddParameterRecords(parameter.Parameters);
    data[key] = data[key].set('Parameters', params);
    let nestedParams = deepAddParameterRecords(parameter.NestedParameters);
    data[key] = data[key].set('NestedParameters', nestedParams);
  });
  return Map(data);
};
