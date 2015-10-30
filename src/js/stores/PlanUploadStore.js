import BaseStore from './BaseStore';
import PlanUploadConstants from '../constants/PlanUploadConstants';

class PlanUploadStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._subscribe.bind(this));
    this.state = {
      name: undefined,
      files: [],
      skipped: []
    };
  }

  _subscribe(payload) {
    switch(payload.actionType) {
    case PlanUploadConstants.ADD_FILE:
      this.onAddFile(payload.file);
      break;
    case PlanUploadConstants.SET_NAME:
      this.onSetName(payload.name);
      break;
    case PlanUploadConstants.PLAN_CREATED:
      this.onPlanCreated();
      break;
    }
  }

  onPlanCreated() {
    this.state.files = [];
    this.state.name = undefined;
    this.state.skipped = [];
    this.emitChange();
  }

  onAddFile(file) {
    if(file.name.match(/\.yaml$/) || file.name.match(/\.json$/)) {
      this.state.files.push(file);
    }
    else {
      this.state.skipped.push(file.name);
    }
    this.emitChange();
  }

  onSetName(name) {
    this.state.name = name;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new PlanUploadStore();
