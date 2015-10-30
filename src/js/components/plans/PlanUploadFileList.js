import React from 'react';

export class PlanUploadFileList extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(!this.props.files || this.props.files.length === 0) {
      return (
        <div></div>
      );
    }
    let files = this.props.files.map(file => {
      return (
        <tr key={file.name}>
          <td>{file.name}</td>
        </tr>
      );
    });
    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="plan-files-list-panel">
          <h4 className="panel-title">Plan Files</h4>
        </div>
        <table className="table upload-files">
          <tbody>
            {files}
          </tbody>
        </table>
      </div>
    );
  }
}
