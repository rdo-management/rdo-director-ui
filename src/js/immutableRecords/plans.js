import { List, Map, Record } from 'immutable';

export const Plan = Record({
  name: '',
  transition: false,
  isUpdating: false,
  isDeleting: false,
  files: List()
});

export const PlanFile = Record({
  name: '',
  contents: '',
  info: Map()
});
