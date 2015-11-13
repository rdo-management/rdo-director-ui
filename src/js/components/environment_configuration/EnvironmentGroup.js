import * as _ from 'lodash';
import React from 'react';

import GenericCheckBox from '../ui/forms/GenericCheckBox';
import GroupedCheckBox from '../ui/forms/GroupedCheckBox';

export default class EnvironmentGroup extends React.Component {
  constructor(props) {
    super(props);
    let firstCheckedEnvironment = _.find(_.filter(props.environments, 'enabled', true));
    this.state = {
      checkedEnvironment: firstCheckedEnvironment ? firstCheckedEnvironment.file : null
    };
  }

  onGroupedCheckBoxChange(checked, environmentFile) {
    this.setState({ checkedEnvironment: checked ? environmentFile : null });
  }

  _generateInputs() {
    let environments = this.props.environments;
    if (environments.length > 1) {
      return environments.map((environment, index) => {
        return (
          <GroupedCheckBox key={index}
                           name={environment.file}
                           id={environment.file}
                           title={environment.title}
                           value={this.state.checkedEnvironment === environment.file ? true : false}
                           validations={{requiresEnvironments: environment.requires}}
                           validationError={`This environment requires
                                             '${environment.requires}'`}
                           checked={this.state.checkedEnvironment === environment.file}
                           onChange={this.onGroupedCheckBoxChange.bind(this)}
                           description={environment.description}/>
        );
      });
    } else {
      let environment = environments[0];
      return (
        <GenericCheckBox name={environment.file}
                         id={environment.file}
                         title={environment.title}
                         value={environment.enabled || false}
                         validations={{requiresEnvironments: environment.requires}}
                         validationError={`This environment requires
                                           '${environment.requires}'`}
                         description={environment.description}/>
      );
    }
  }

  render() {
    let environments = this._generateInputs();

    return (
      <div className="environment-group">
        <EnvironmentGroupHeading title={this.props.title}
                                 description={this.props.description}/>
        {environments}
      </div>
    );
  }
}
EnvironmentGroup.propTypes = {
  description: React.PropTypes.string,
  environments: React.PropTypes.array,
  title: React.PropTypes.string
};


class EnvironmentGroupHeading extends React.Component {
  render() {
    if (this.props.title) {
      return (
        <h4>
          {this.props.title}<br/>
          <small>{this.props.description}</small>
        </h4>
      );
    } else if (this.props.description) {
      return (
        <p>{this.props.description}</p>
      );
    } else {
      return false;
    }
  }
}
EnvironmentGroupHeading.propTypes = {
  description: React.PropTypes.string,
  title: React.PropTypes.string
};
