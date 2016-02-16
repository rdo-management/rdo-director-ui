import * as _ from 'lodash';
import { List, Map } from 'immutable';

import PlansConstants from '../constants/PlansConstants';

const initialState = Map({
  isFetchingPlans: false,
  isFetchingPlan: false,
  isDeletingPlan: false,
  isCreatingPlan: false,
  isUpdatingPlan: false,
  conflict: undefined,
  currentPlanName: undefined,
  currentPlanFiles: Map(),
  all: List()
});


function processPlanPayload(payload, currentPlanFiles) {
  let planFiles = {};
  if(payload.files) {
    _.map(payload.files, (item, key) => {
      let currentItem = currentPlanFiles.get(key);
      item.info = {
        newFile: false,
        changed: false
      };
      if(currentItem) {
        item.info.changed = currentItem.content !== item.content;
      }
      item.name = key;
      planFiles[key] = item;
    });
    return Map(planFiles);
  }
  return Map();
}

function processSelectedFiles(selectedFiles, currentPlanFiles) {
  let planFiles = {};
  selectedFiles.forEach(item => {
    let currentItem = currentPlanFiles.get(item.name);
    item.info = {
      newFile: true,
      changed: false
    };
    if(currentItem) {
      item.info.changed = currentItem.content !== item.content;
      item.info.newFile = false;
    }
    planFiles[item.name] = item;
  });
  return Map(planFiles);
}

export default function plansReducer(state = initialState, action) {
  switch(action.type) {

  case PlansConstants.REQUEST_PLAN:
    return state
        .set('currentPlanFiles', Map())
        .set('isFetchingPlan', true);

  case PlansConstants.RECEIVE_PLAN:
    return state
        .set('currentPlanFiles', processPlanPayload(
          action.payload,
          state.get('currentPlanFiles')
        ))
        .set('isFetchingPlan', false);

  case PlansConstants.PLAN_FILES_SELECTED:
    return state
        .set('currentPlanFiles', processSelectedFiles(
          action.payload,
          state.get('currentPlanFiles')
        ));

  case PlansConstants.REQUEST_PLANS:
    return state.set('isFetchingPlans', true);

  case PlansConstants.RECEIVE_PLANS:
    return state
            .set('isFetchingPlans', false)
            .set('all', List(action.payload).map(plan => plan.name).sort());

  case PlansConstants.CHOOSE_PLAN:
    return state.set('currentPlanName', action.payload);

  case PlansConstants.PLAN_DETECTED:
    return state
            .set('currentPlanName', action.payload.currentPlanName)
            .set('conflict', action.payload.conflict);

  case PlansConstants.DELETING_PLAN:
    return state
            .set('isDeletingPlan', action.payload);

  case PlansConstants.PLAN_DELETED:
    return state
            .set('isDeletingPlan', false);

  case PlansConstants.CREATING_PLAN:
    return state
            .set('isCreatingPlan', true);

  case PlansConstants.PLAN_CREATED:
    return state
            .set('isCreatingPlan', false);

  case PlansConstants.UPDATING_PLAN:
    return state
            .set('isUpdatingPlan', true);

  case PlansConstants.PLAN_UPDATED:
    return state
            .set('isUpdatingPlan', false);

  default:
    return state;

  }
}
