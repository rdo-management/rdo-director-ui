import when from 'when';

import NotificationActions from '../actions/NotificationActions';

class TripleOApiService {

  createPlan(name, files) {
    let def = when.defer();
    this._callCreatePlan(name, files, def);
    return def.promise;
  }

  listPlans() {
    let def = when.defer();
    this._callListPlans(def);
    return def.promise;
  }

  getPlan(name) {
    let def = when.defer();
    this._callGetPlan(name, def);
    return def.promise;
  }

  _callGetPlan(name, def) {
    setTimeout(() => {
      def.resolve([]);
    }, 500);
  }

  _callListPlans(def) {
    setTimeout(() => {
      def.resolve(['overcloud']);
    }, 500);
  }

  _callCreatePlan(name, files, def) {
    let planFiles = {};
    files.forEach(item => {
      planFiles[item.name] = {};
      planFiles[item.name].contents = item.content;
    });
    console.log(JSON.stringify(planFiles));
    setTimeout(() => {
      def.resolve('add status message of http request');
      NotificationActions.notify({
        title: 'Plan Created',
        message: 'The plan ' + name + ' was successfully created.',
        type: 'success'
      });
    }, 500);
  }
}

export default new TripleOApiService();
