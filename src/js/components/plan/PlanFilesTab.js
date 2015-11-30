import React from 'react';

import FileList from './FileList';

export default class PlanFilesTab extends React.Component {
  render() {
    return (
      <div className={`tab-pane ${this.props.active}`}>
        <FileList files={this.props.planFiles} />
      </div>
    );
  }
}
PlanFilesTab.propTypes = {
  active: React.PropTypes.string,
  planFiles: React.PropTypes.array
};
