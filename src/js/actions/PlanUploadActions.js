import when from 'when';
import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationActions from '../actions/NotificationActions';
import PlanUploadConstants from '../constants/PlanUploadConstants';
import PlanUploadStore from '../stores/PlanUploadStore';
import TripleOApiService from '../services/TripleOApiService';

export default {

  addFiles(files) {
    for(let i=0, l=files.length; i<l; i++) {
      let reader = new FileReader();
      let file = files[i];
      reader.onload = (f => {
        return e => {
          let obj = {
            name: f.webkitRelativePath.replace(/^[^\/]*\//, ''),
            content: e.target.result
          };
          AppDispatcher.dispatch({
            actionType: PlanUploadConstants.ADD_FILE,
            file: obj
          });
        };
      }(file));
      reader.readAsText(file);
    }
  },

  changeName(name) {
    AppDispatcher.dispatch({
      actionType: PlanUploadConstants.SET_NAME,
      name: name
    });
  },

  createPlan() {
    let files = PlanUploadStore.getState().files;
    let name = PlanUploadStore.getState().name;
    when(TripleOApiService.createPlan(name, files).then(result => {
      AppDispatcher.dispatch({
        actionType: PlanUploadConstants.PLAN_CREATED
      });
      NotificationActions.notify({
        title: 'Plan created',
        message: 'The plan ' + name + ' was sucessfully created.',
        type: 'success'
      });
    }));
  }
};
