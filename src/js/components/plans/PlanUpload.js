import React from 'react';
import PlanUploadConstants from '../../constants/PlanUploadConstants';
import PlanUploadActions from '../../actions/PlanUploadActions';

export class PlanUploadForm extends React.Component {

  constructor() {
    super();
    this.state = {
      files = []
    };
  }

  _onChange(e) {
    let files = [];
    PlanUploadActions.addFiles(e.target.files);
  }

  render () {
    return (
      <section>
        <strong>Upload Plan Files</strong>
        <input type="file" onChange={this._onChange} name="PlanUpload" multiple />
      </section>
    );
  }
}
