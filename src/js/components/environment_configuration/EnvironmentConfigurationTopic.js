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
      <fieldset className="environment-topic">
        {environmentGroups}
      </fieldset>
    );
  }
}
EnvironmentConfigurationTopic.propTypes = {
  description: React.PropTypes.string,
  environmentGroups: React.PropTypes.array,
  title: React.PropTypes.string.isRequired
};
