import React from 'react';
import PlanUploadActions from '../../actions/PlanUploadActions';
import PlanUploadStore from '../../stores/PlanUploadStore';

class UploadButton extends React.Component {
  constructor() {
    super();
    this.onUploadClick = this._onUploadClick.bind(this);
  }

  _onUploadClick() {
    PlanUploadActions.createPlan();
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
      files: {
        rootTemplate: [],
        environment: [],
        files: []
      }
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
    let rootTemplate;
    if(this.state.files.rootTemplate) {
      rootTemplate = this.state.files.rootTemplate.name;
    }
    let envFiles = this.state.files.environment.map(file => {
      return (
        <li key={file.name}>
          {file.name}
        </li>
      );
    });
    let files = this.state.files.files.map(file => {
      return (
        <li key={file.name}>
          {file.name}
        </li>
      );
    });
    return (
      <section>
        <h2>Root Template</h2>
        {rootTemplate}
        <h2>Environment Files</h2>
        <ul className="upload-file-list">
          {envFiles}
        </ul>
        <h2>Additional Files</h2>
        <ul className="upload-file-list">
          {files}
        </ul>
        <UploadButton/>
      </section>
    );
  }
}
