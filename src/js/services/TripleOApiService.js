import request from 'reqwest';
import when from 'when';

import NotificationActions from '../actions/NotificationActions';

class TripleOApiService {

  createPlan(name, rootTemplate, environmentFiles, additionalFiles) {
    let def = when.defer();
    this._callCreatePlan(name, rootTemplate, environmentFiles, additionalFiles, def);
    return def.promise;
  }

  _callCreatePlan(name, rootTemplate, environmentFiles, additionalFiles, def) {
    let planFiles = {};
    planFiles[rootTemplate.name] = {
      meta: {
        'file-type': 'root-template'
      },
      contents: rootTemplate.content
    };
    environmentFiles.forEach(item => {
      planFiles[item.name] = {
        meta: {
          'file-type': 'environment'
        },
        contents: item.content
      };
    });
    additionalFiles.forEach(item => {
      planFiles[item.name] = {
        contents: item.content
      };
    });
    setTimeout(() => {
      console.log(name);
      console.log(JSON.stringify(planFiles));
      def.resolve('done');
    }, 500);
  }
}

export default new TripleOApiService();
