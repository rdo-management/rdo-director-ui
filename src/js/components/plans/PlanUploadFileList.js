import React from 'react';
import PlanUploadActions from '../../actions/PlanUploadActions';
import PlanUploadStore from '../../stores/PlanUploadStore';


class UploadButton extends React.Component {
  constructor() {
    super();
    this.onUploadClick = this._onUploadClick.bind(this);
  }

  _onUploadClick() {
    PlanUploadActions.uploadFiles();
  }

  render() {
    return (
        <button onClick={this.onUploadClick}>
          Upload Files
        </button>
    );
  }
}

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
    let fileNodes = this.state.files.map(file => {
      return (
        <li key={file.name}>
          {file.name}
        </li>
      );
    });
    let button = this.state.files.length < 1 ? '' : <UploadButton />;
    return (
      <section>
        <ul className="upload-file-list">
          {fileNodes}
        </ul>
        {button}
      </section>
    );
  }
}
