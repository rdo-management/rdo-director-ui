import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import HorizontalInput from '../../ui/forms/HorizontalInput';

export default class PXEAndIPMIToolDriverFields extends React.Component {
  constructor(props) {
    super(props);
    this.sshUserValidator = {
      matchRegexp: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    };
    this.sshUserValidationMessage =  'Username must be between 8 and 20 characters ' +
                                     'and contain only alphanumeric characters, underscores, ' +
                                     'and dots.';

    this.ipValidator = {
      matchRegexp: new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]' +
                              '[0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')
    };
    this.ipValidatorMessage = 'Please enter a valid IPv4 Address';

  }
  render() {
    return (
      <div>
        <HorizontalInput name="driver_info.ipmi_address"
                         title="IPMI IP Address"
                         inputColumnClasses="col-sm-7"
                         labelColumnClasses="col-sm-5"
                         value={this.props.driver_info.get('ipmi_address')}
                         validations={this.ipValidator}
                         validationError={this.ipValidatorMessage}
                         required />
      </div>
    );
  }
}
PXEAndIPMIToolDriverFields.propTypes = {
  driver_info: ImmutablePropTypes.map.isRequired
};
