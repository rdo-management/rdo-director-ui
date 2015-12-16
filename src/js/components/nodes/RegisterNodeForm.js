import React from 'react';

// import BlankSlate from '../ui/BlankSlate';
import HorizontalInput from '../ui/forms/HorizontalInput';
import HorizontalSelect from '../ui/forms/HorizontalSelect';

export default class RegisterNodeForm extends React.Component {

  constructor(props) {
    super(props);

    this.driverOptions = ['pxe_ipmitool', 'pxe_ssh'];

    this.usernameValidator = {
      matchRegexp: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    };
    this.usernameValidatorMessage =  'Usern ame must be between 8 and 20 characters ' +
                                     'and contain only alphanumeric characters, underscores, ' +
                                     'and dots.';

    this.ipValidator = {
      matchRegexp: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    };
    this.ipValidatorMessage = 'Please enter a valid IPv4 Address';

    this.macAddressValidator = {
      matchRegexp: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    };
    this.macAddressValidatorMessage = 'Please enter a valid MAC Address';
  }


  getNodeDriver () {
    let selectedNode = this.props.selectedNode;
    if (selectedNode) {
      return selectedNode.driver;
    }
  }

  getNodeAddress () {
    let selectedNode = this.props.selectedNode;
    if (selectedNode) {
      return selectedNode.ipAddress;
    }
  }

  getNodeUser () {
    let selectedNode = this.props.selectedNode;
    if (selectedNode) {
      return selectedNode.ipmiUsername;
    }
  }

  getNodePassword () {
    let selectedNode = this.props.selectedNode;
    if (selectedNode) {
      return selectedNode.ipmiPassword;
    }
  }

  getNodeMacAddress () {
    let selectedNode = this.props.selectedNode;
    if (selectedNode) {
      return selectedNode.nicMacAddress;
    }
  }

  render () {
    if (this.props.selectedNode) {
      return (
        <div className="details-form">
          <h3>Node Detail</h3>
          <div className="form-horizontal">
            <fieldset>
              <legend>Management</legend>
              <HorizontalSelect name="driver"
                                title="Driver"
                                inputColumnClasses="col-sm-7 form-input"
                                labelColumnClasses="col-sm-5"
                                getValue={this.getNodeDriver.bind(this)}
                                options={this.driverOptions} />
              <HorizontalInput name="ipAddress"
                               title="IP Address"
                               inputColumnClasses="col-sm-7 form-input"
                               labelColumnClasses="col-sm-5"
                               getValue={this.getNodeAddress.bind(this)}
                               validations={this.ipValidator}
                               validationError={this.ipValidatorMessage}
                               required />
              <HorizontalInput name="ipmiUsername"
                               title="IPMI User"
                               inputColumnClasses="col-sm-7 form-input"
                               labelColumnClasses="col-sm-5"
                               getValue={this.getNodeUser.bind(this)}
                               validations={this.usernameValidator}
                               validationError={this.usernameValidatorMessage}
                               required />
              <HorizontalInput name="ipmiPassword"
                               title="IPMI Password"
                               type="password"
                               inputColumnClasses="col-sm-7 form-input"
                               labelColumnClasses="col-sm-5"
                               getValue={this.getNodePassword.bind(this)}
                               required />
            </fieldset>
            <fieldset>
              <legend>Networking</legend>
              <HorizontalInput name="nicMacAddress"
                               title="NIC MAC Address"
                               inputColumnClasses="col-sm-7 form-input"
                               labelColumnClasses="col-sm-5"
                               getValue={this.getNodeMacAddress.bind(this)}
                               validations={this.macAddressValidator}
                               validationError={this.macAddressValidatorMessage}
                               required />
            </fieldset>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="blank-slate-pf">
          <div className="blank-slate-pf-icon">
            <span className="fa fa-cubes"></span>
          </div>
          <h1>No Nodes</h1>
          <p>Add a node manually or upload nodes from a CSV file.</p>
        </div>
      );
/* Once the BlankSlate component is added, change to use it
        <BlankSlate iconClass="fa fa-cubes"
                    title="No Nodes"
                    message="Add a node manually or upload nodes from a CSV file." />
      );
 */
    }
  }
}

RegisterNodeForm.propTypes = {
  selectedNode: React.PropTypes.object
};
