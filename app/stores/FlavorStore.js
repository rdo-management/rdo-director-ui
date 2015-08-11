import BaseStore from './BaseStore';
import Flavors from '../data/Flavors';

class FlavorStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = {
      flavors: Flavors
    };
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case 'UPDATE_FLAVOR_ROLE':
      this.updateFlavorRole(payload.role);
      break;
    default:
      break;
    }
  }

  updateFlavorRole(role) {
    this.state.flavors[0].roles.filter((r) => { r.name == role.name; })[0] = role;
    this.state.flavors[0].freeNodeCount = this._calculateFreeNodes(this.state.flavors[0]);
    this.emitChange();
  }

  _calculateFreeNodes(flavor) {
    let reserved = 0;
    flavor.roles.forEach((role) => { reserved += role.nodeCount; });
    return flavor.nodeCount - reserved;
  }

  getState() {
    this.state.flavors.forEach((flavor) => { flavor.freeNodeCount = this._calculateFreeNodes(flavor); });
    return this.state;
  }
}

export default new FlavorStore();
