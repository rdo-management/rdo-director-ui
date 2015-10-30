import BaseStore from './BaseStore';
import NotificationActions from '../actions/NotificationActions';
import PlanUploadConstants from '../constants/PlanUploadConstants';

class PlanUploadStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._subscribe.bind(this));
    this.state = {
      name: undefined,
      files: {
        rootTemplate: undefined,
        environment: [],
        files: []
      },
      fileNames: {
        environment: {},
        files: {}
      }
    };
  }

  _subscribe(payload) {
    switch(payload.actionType) {
    case PlanUploadConstants.ADD_FILE:
      this.onAddFile(payload.file, payload.metaKey);
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
    this.emitChange();
  }

  onAddFile(file, metaKey) {
    if(metaKey === 'rootTemplate') {
      this.state.files.rootTemplate = file;
    }
    else if(metaKey === 'environment' || metaKey === 'files') {
      if(this.state.fileNames[metaKey][file.name] !== true) {
        this.state.fileNames[metaKey][file.name] = true;
        this.state.files[metaKey].push(file);
      }
      else {
        NotificationActions.notify({
          title: 'Duplicate File',
          message: 'The file ' + file.name + ' was already added.',
          type: 'error'
        });
      }
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
