import React from 'react';
import PlanUploadActions from '../../actions/PlanUploadActions';

export class PlanUploadForm extends React.Component {

  constructor() {
    super();
    this.state = {
    };
    this.onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    PlanUploadActions.addFiles(e.target.files);
  }

  render () {
    return (
      <section>
        <strong>Upload Plan Files</strong>
        <input type="file" onChange={this.onChange} name="PlanUpload" multiple />
      </section>
    );
  }
}
