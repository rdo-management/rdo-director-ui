import { fromJS, List, Map } from 'immutable';

import PlansConstants from '../constants/PlansConstants';
import { Plan, PlanFile } from '../immutableRecords/plans';

const initialState = Map({
  isFetchingPlans: false,
  conflict: undefined,
  currentPlanName: undefined,
  editingPlan: undefined,
  all: List()
});

export default function plansReducer(state = initialState, action) {
  let planIndex, filesList;

  switch(action.type) {

  case PlansConstants.REQUEST_PLAN:
    return state;

  case PlansConstants.RECEIVE_PLAN:
    filesList = action.payload.files
      ? filesList = Map(action.payload.files)
                      .map((item, key) => { item.name = key; return new PlanFile(item); })
                      .sortBy(item => item.get('name'))
                      .toList()
      : List();
    planIndex = state.get('all').findIndex(plan => plan.get('name') === action.payload.name);
    if(planIndex === -1) {
      return state
              .setIn(['all'], state.get('all').push(
                new Plan({
                  name: action.payload.name,
                  files: filesList
                }))
              );
    }
    return state
            .setIn(['all', planIndex, 'files'], filesList);

  case PlansConstants.PLAN_FILES_SELECTED:
    return state
            .set('editingPlan', Map(action.payload));

  case PlansConstants.EDIT_PLAN:
    return state
            .set('editingPlan', Map({ planName: action.payload, files: [] }));

  case PlansConstants.DISCARD_PLAN_EDIT:
    return state
            .set('editingPlan', undefined);

  case PlansConstants.REQUEST_PLANS:
    return state.set('isFetchingPlans', true);

  case PlansConstants.RECEIVE_PLANS:
    let planData = [];
    fromJS(action.payload.result).map(name => planData.push(
      new Plan(action.payload.entities.plan[name]
    )));
    return state
            .set('isFetchingPlans', false)
            .set('all', fromJS(planData));

  case PlansConstants.PLAN_CHOSEN:
    return state.set('currentPlanName', action.payload);

  case PlansConstants.PLAN_DETECTED:
    return state
            .set('currentPlanName', action.payload.currentPlanName)
            .set('conflict', action.payload.conflict);

  case PlansConstants.DELETING_PLAN:
    planIndex = state.get('all').findIndex(plan => plan.get('name') === action.payload);
    return state.setIn(['all', planIndex, 'isDeleting'], true);

  case PlansConstants.PLAN_DELETED:
    planIndex = state.get('all').findIndex(plan => plan.get('name') === action.payload);
    return state.setIn(['all', planIndex, 'isDeleting'], false);

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
