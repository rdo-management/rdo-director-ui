import ClassNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

export default class FileList extends React.Component {

  render() {
    if(this.props.files.size === 0) {
      return null;
    }

    let files = this.props.files.map(file => {
      let info = file.get('info').toJS() || {};
      let classes = ClassNames({
        'changed-plan-file': info.changed,
        'new-plan-file': info.newFile
      });
      return (
        <tr key={file.get('name')}>
          <td className={classes}>{file.get('name')}</td>
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
  files: ImmutablePropTypes.list
};

FileList.defaultProps = {
  files: []
};
