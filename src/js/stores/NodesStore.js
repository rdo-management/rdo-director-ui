import BaseStore from './BaseStore';
import NodesConstants from '../constants/NodesConstants';

class NodesStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {};
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case NodesConstants.LIST_NODES:
      this.onListNodes(payload.nodes);
      break;
    default:
      break;
    }
  }

  onListNodes(nodes) {
    this.state.nodes = nodes;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new NodesStore();
