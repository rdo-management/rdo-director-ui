import { createSelector } from 'reselect';

import { ValidationsStatusCounts } from '../immutableRecords/validations';

const validationStages = (state) => state.validations.get('validationStages');
const validations = (state) => state.validations.get('validations');
const validationResults = (state) => state.validations.get('validationResults');

/**
 * Returns Map of Validation Stages with nested Validations and their Lates Result
 */
export const getValidationStages = createSelector(
  [validationStages, validations, validationResults],
  (stages, validations, results) => {
    return stages.map(stage => {
      return stage.update('validations', vals => {
        return vals.map(validation => validations.get(validation));
      });
    });
  }
);

/**
 * Returns Status Counts across all validations - instance of ValidationsStatusCounts Record
 */
export const getValidationsStatusCounts = createSelector(
  validations, (validations) => {
    return new ValidationsStatusCounts(validations.countBy(validation => validation.status));
  }
);
