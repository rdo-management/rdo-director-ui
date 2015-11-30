import React from 'react';

import FileList from './FileList';
import HorizontalInput from '../ui/forms/HorizontalInput';
import NavTab from '../ui/NavTab';
import PlanFileInput from './PlanFileInput';

export default class PlanEditFormTabs extends React.Component {
  setActiveTab(tabName) {
    return this.props.currentTab === tabName ? 'active' : '';
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <NavTab to={`/plans/${this.props.planName}/edit`} query={{tab: 'editPlan'}}>Update Plan</NavTab>
          <NavTab to={`/plans/${this.props.planName}/edit`} query={{tab: 'planFiles'}}>
            Files <span className="badge">{this.props.planFiles.length}</span>
          </NavTab>
        </ul>
        <div className="tab-content">
          <PlanFormTab active={this.setActiveTab('editPlan')} />
          <PlanFilesTab active={this.setActiveTab('planFiles')}
                        planFiles={this.props.planFiles} />
        </div>
      </div>
    );
  }
}
PlanEditFormTabs.propTypes = {
  currentTab: React.PropTypes.string,
  planFiles: React.PropTypes.array.isRequired
};
PlanEditFormTabs.defaultProps = {
  currentTtab: 'editPlan'
};

class PlanFormTab extends React.Component {
  render() {
    return (
      <div className={`tab-pane ${this.props.active}`}>
        <PlanFileInput name="planFiles"
                       title="Upload Files"
                       inputColumnClasses="col-sm-7"
                       labelColumnClasses="col-sm-3"
                       multiple
                       required/>
      </div>
    );
  }
}
PlanFormTab.propTypes = {
  active: React.PropTypes.string
};

class PlanFilesTab extends React.Component {
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
