import React from 'react';
import PlanUploadStore from '../../stores/PlanUploadStore';

export class PlanUploadFileList extends React.Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
    this.changeListener = this._changeListener.bind(this);
  }

  componentDidMount() {
    PlanUploadStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlanUploadStore.removeChangeListener(this.changeListener);
  }

  _changeListener() {
    this.setState({ files: PlanUploadStore.getState().files });
  }

  render() {
    let files = this.state.files.map(file => {
      return (
        <tr key={file.name}>
          <td>{file.name}</td>
          <td><button className="remove-file btn btn-xs">Remove</button></td>
        </tr>
      );
    });
    return (
      <section>
        <h2>Files</h2>
        <table className="upload-files">
          <thead>
            <tr>
              <th>File Name</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {files}
          </tbody>
        </table>
      </section>
    );
  }
}
