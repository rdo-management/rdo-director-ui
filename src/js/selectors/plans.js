import { createSelector } from 'reselect';
import { List } from 'immutable';

import { PlanFile } from '../immutableRecords/plans';

const plans = (state) => state.plans.get('all');
const editingPlan = (state) => state.plans.get('editingPlan');

/**
 * Returns Map of Validation Stages with nested Validations and their Lates Result
 */
export const getFilesList = createSelector(
  [editingPlan, plans],
  (editingPlan, plans) => {
    if(editingPlan) {
      let name = editingPlan.get('name');
      let files = editingPlan.get('files');
      if(files && files.length > 0) {
        return List.of(...editingPlan.get('files')).map(item => {
          return new PlanFile({
            name: item.name,
            contents: item.content
          });
        }).sortBy(file => file.name);
      }
      else if (name) {
        return getPlanFiles(name, plans).sortBy(file => file.name);
      }
    }
    return List();
  }
);

const getPlanFiles = (name, plans) => {
  const plan = plans.filter(plan => plan.get('name') === name).first();
  return plan ? plan.get('files') : List();
};
