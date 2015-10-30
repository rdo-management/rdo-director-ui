import AppDispatcher from '../dispatchers/AppDispatcher.js';
import PlanUploadConstants from '../constants/PlanUploadConstants';
import PlanUploadStore from '../stores/PlanUploadStore';

export default {
  addFiles(files) {
    for(let i=0, l=files.length; i<l; i++) {
      let reader = new FileReader();
      let file = files[i];
      reader.onload = (f => {
        return e => {
          let obj = {name: f.name, content: e.target.result};
          AppDispatcher.dispatch({
            actionType: PlanUploadConstants.ADD_FILE,
            file: obj
          });
        };
      }(file));
      reader.readAsText(file);
    }
  },

  uploadFiles() {
    let files = PlanUploadStore.getState().files;
    console.log('uploading files to tuskar v3', files);
  }
};
