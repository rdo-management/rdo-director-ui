import React from 'react';

import EnvironmentGroup from './EnvironmentGroup';

export default class EnvironmentConfigurationTopic extends React.Component {
  render() {
    let environmentGroups = this.props.environmentGroups.map((envGroup, index) => {
      return (
        <EnvironmentGroup key={index}
                          title={envGroup.title}
                          description={envGroup.description}
                          environments={envGroup.environments}/>
      );
    });

    return (
      <div className="masonry-item">
        <div className="panel panel-default panel-environment">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.title}</h3>
            <small className="subheader">{this.props.description}</small>
          </div>
          <div className="panel-body clearfix">
            {environmentGroups}
          </div>
        </div>
      </div>
    );
  }
}
EnvironmentConfigurationTopic.propTypes = {
  description: React.PropTypes.string,
  environmentGroups: React.PropTypes.array,
  title: React.PropTypes.string.isRequired
};
