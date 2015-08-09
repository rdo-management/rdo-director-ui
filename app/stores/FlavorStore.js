import BaseStore from './BaseStore';
import Flavors from '../data/Flavors';

class FlavorStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      flavors: Flavors,
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
      case "CHANGE_NODE_COUNT":
        this.onNodeCountChange(payload.roleData);
        break;
      default:
        break;
    }
  }

  onNodeCountChange(roleData) {
    this.state.flavors[0].roles[0].nodeCount = roleData.newCount;
    this.state.flavors[0].freeNodeCount = 20 - roleData.newCount;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new FlavorStore();
