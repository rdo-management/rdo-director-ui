import ClassNames from 'classnames';
import React from 'react';

export default class FileList extends React.Component {

  render() {
    if(this.props.files.length === 0) {
      return null;
    }
    let files = this.props.files.map(file => {
      let info = file.info || {};
      let classes = ClassNames({
        'changed-plan-file': info.changed,
        'existing-plan-file': info.existing,
        'new-plan-file': info.newFile
      });
      return (
        <tr key={file.name}>
          <td className={classes}>{file.name}</td>
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

FileList.propTypes = {
  files: React.PropTypes.array.isRequired
};

FileList.defaultProps = {
  files: []
};
