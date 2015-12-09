import React from 'react';

import ResourceGroupTab from './ResourceGroupTab';
import ParametersTabPane from './ParametersTabPane';

export default class ParameterTree extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: undefined
    };
  }

  activateTab(tabName) {
    this.setState({ activeTab: tabName });
  }

  render() {
    return (
      <div className="clearfix">
        <div className="col-sm-5 sidebar-pf sidebar-pf-left">
          <div className="treeview">
            <ul className="list-group">
              <ResourceGroupTab name="RootParameters"
                                description={this.props.parameters.Description}
                                level={0}
                                nestedParameters={this.props.parameters.NestedParameters}
                                activateTab={this.activateTab.bind(this)}
                                activeTab={this.state.activeTab}/>
            </ul>
          </div>
        </div>
        <div className="col-sm-7">
          <ParametersTabPane name="RootParameters"
                             activeTab={this.state.activeTab}
                             nestedParameters={this.props.parameters.NestedParameters}
                             parameters={this.props.parameters.Parameters}/>
        </div>
      </div>
    );
  }
}
ParameterTree.propTypes = {
  parameters: React.PropTypes.object
};
