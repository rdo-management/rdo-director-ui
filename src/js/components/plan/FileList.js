import ClassNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import { PlanFile } from '../../immutableRecords/plans';
import React from 'react';

export default class FileList extends React.Component {

  getMergedFiles(planFiles, selectedFiles) {
    let files = {};
    if(!planFiles.isEmpty()) {
      planFiles.map(file => {
        files[file.get('name')] = file;
      });
    }
    if(selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        let existing = files[file.name];
        let info;
        if(!existing) {
          info = Map({
            newFile: planFiles.isEmpty() ? false : true,
            changed: false
          });
        }
        else {
          info = Map({
            newFile: false,
            changed: file.content !== existing.get('contents')
          });
        }
        files[file.name] = PlanFile({ name: file.name, info: info });
      });
    }
    return Map(files)
            .sort((fileA, fileB) => {
              let [aName, aChangedOrNew] = [ fileA.get('name'),
                                             (fileA.get('info').get('changed') ||
                                              fileA.get('info').get('newFile')) ];
              let [bName, bChangedOrNew] = [ fileB.get('name'),
                                             (fileB.get('info').get('changed') ||
                                              fileB.get('info').get('newFile')) ];
              if(aChangedOrNew && !bChangedOrNew) {
                return -1;
              }
              else if(!aChangedOrNew && bChangedOrNew) {
                return 1;
              }
              else {
                return aName > bName ? 1 : -1;
              }
            })
            .toArray();
  }

  render() {
    if(this.props.planFiles.size === 0 && this.props.selectedFiles === 0) {
      return null;
    }
    let files = this.getMergedFiles(this.props.planFiles, this.props.selectedFiles).map(file => {
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
  planFiles: ImmutablePropTypes.list,
  selectedFiles: React.PropTypes.array
};

FileList.defaultProps = {
  planFiles: List(),
  selectedFiles: []
};
