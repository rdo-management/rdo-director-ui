import BaseStore from './BaseStore';
import PlanUploadConstants from '../constants/PlanUploadConstants';

class PlanUploadStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._subscribe.bind(this));
    this.state = {
      files: []
    };
  }

  _subscribe(payload) {
    switch(payload.actionType) {
    case PlanUploadConstants.ADD_FILE:
      this.onAddFile(payload.file);
      break;
    }
  }

  onAddFile(file) {
    this.state.files.push(file);
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new PlanUploadStore();
