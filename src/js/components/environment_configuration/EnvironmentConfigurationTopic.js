import ClassNames from 'classnames';
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

    let classes = ClassNames({
      'tab-pane': true,
      'active': this.props.isActive
    });

    return (
      <div className={classes}>
        <fieldset className="environment-topic">
          {environmentGroups}
        </fieldset>
      </div>
    );
  }
}
EnvironmentConfigurationTopic.propTypes = {
  description: React.PropTypes.string,
  environmentGroups: React.PropTypes.array,
  isActive: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired
};
