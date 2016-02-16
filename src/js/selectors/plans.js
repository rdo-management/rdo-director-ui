import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

import { PlanFile } from '../immutableRecords/plans';

const plans = (state) => state.plans.get('all');
const editingPlan = (state) => state.plans.get('editingPlan');

/**
 * Returns listing of plan files, based on the selected files in a form and/or an existing plan.
 */
export const getFilesList = createSelector(
  [editingPlan, plans],
  (editingPlan, plans) => {
    if(editingPlan) {
      let name = editingPlan.get('planName');
      let selectedFiles = editingPlan.get('files');
      let planFiles = name
        ? getPlanFiles(name, plans).sortBy(file => file.name)
        : undefined;
      if(planFiles && !planFiles.isEmpty() && selectedFiles) {
        return mergePlanFiles(selectedFiles, planFiles);
      }
      else if(selectedFiles && selectedFiles.length > 0) {
        return List.of(...editingPlan.get('files')).map(item => {
          return new PlanFile({
            name: item.name,
            contents: item.content
          });
        }).sortBy(file => file.name);
      }
      else if (name) {
        return planFiles;
      }
    }
    return List();
  }
);

const getPlanFiles = (name, plans) => {
  const plan = plans.filter(plan => plan.get('name') === name).first();
  return plan ? plan.get('files') : List();
};

const mergePlanFiles = (selectedFiles, planFiles) => {
  let merged = [];
  selectedFiles.map(item => {
    let planFile = planFiles.filter(planFile => planFile.get('name') === item.name).first();
    if(planFile) {
      merged.push(
        planFile
          .set('info', Map({
            changed: item.content !== planFile.get('contents'),
            newFile: false }))
          .set('contents', item.content));
    }
    else {
      merged.push(
        new PlanFile({
          name: item.name,
          contents: item.content,
          info: Map({
            newFile: true
          })
        })
      );
    }
  });
  return List.of(...merged).sortBy(item => item.get('name'));
};
