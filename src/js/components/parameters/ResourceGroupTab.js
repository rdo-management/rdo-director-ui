import * as _ from 'lodash';
import ClassNames from 'classnames';
import React from 'react';

import ResourceGroupList from './ResourceGroupList';

export default class ResourceGroupTab extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true
    };
  }

  toggleExpanded(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  activateTab(e) {
    e.preventDefault();
    this.props.activateTab(this.props.name);
  }

  isTabActive() {
    return this.props.activeTab === this.props.name;
  }

  renderIndentation(level) {
    return _.times(level, (n) => {
      return (<span key={n} className="indent"/>);
    });
  }

  render() {
    let expandSpanClasses = ClassNames({
      'icon': true,
      'expand-icon fa': this.props.nestedParameters,
      'fa-angle-down': this.state.expanded && this.props.nestedParameters,
      'fa-angle-right': !this.state.expanded && this.props.nestedParameters
    });

    let directorySpanClasses = ClassNames({
      'icon node-icon fa': true,
      'fa-folder': this.props.nestedParameters,
      'fa-file-o': !this.props.nestedParameters
    });

    return (
      <div>
        <li className={`list-group-item${this.isTabActive() ? ' node-selected' : ''}`}
            title={this.props.description}>
          {this.renderIndentation(this.props.level)}
          <span>
            <span onClick={this.toggleExpanded.bind(this)} className={expandSpanClasses}/>
            <span className={directorySpanClasses}/>
          </span>
          <span onClick={this.activateTab.bind(this)}>
            {this.props.name}
          </span>
        </li>
        {this.props.nestedParameters ? (
          <ResourceGroupList level={this.props.level+1}
                             nestedParameters={this.props.nestedParameters}
                             expanded={this.state.expanded}
                             activeTab={this.props.activeTab}
                             activateTab={this.props.activateTab}/>
        ) : null}
      </div>
    );
  }
}
ResourceGroupTab.propTypes = {
  activateTab: React.PropTypes.func,
  activeTab: React.PropTypes.string,
  description: React.PropTypes.string,
  level: React.PropTypes.number,
  name: React.PropTypes.string,
  nestedParameters: React.PropTypes.object
};
