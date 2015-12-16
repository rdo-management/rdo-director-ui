import Formsy from 'formsy-react';
import React from 'react';

import HorizontalInput from '../ui/forms/HorizontalInput';
import HorizontalSelect from '../ui/forms/HorizontalSelect';
import PXEAndSSHDriverFields from './driver_fields/PXEAndSSHDriverFields';
import PXEAndIPMIToolDriverFields from './driver_fields/PXEAndIPMIToolDriverFields';

export default class RegisterNodeForm extends React.Component {
  constructor(props) {
    super(props);

    this.driverOptions = ['pxe_ipmitool', 'pxe_ssh'];

    this.macAddressValidator = {
      matchRegexp: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    };
    this.macAddressValidatorMessage = 'Please enter a valid MAC Address';
  }

  onNodeFormValidSubmit(formData, resetForm, invalidateForm) {
    let updatedNode = formData;
    updatedNode.id = this.props.selectedNode.id;
    updatedNode.valid = true;
    this.props.onUpdateNode(updatedNode);
  }

  onNodeFormInvalidSubmit(formData, resetForm, invalidateForm) {
    let updatedNode = formData;
    updatedNode.id = this.props.selectedNode.id;
    updatedNode.valid = false;
    this.props.onUpdateNode(updatedNode);
  }

  onValid() {
    this.refs.nodeForm.submit();
  }

  onInvalid() {
    this.refs.nodeForm.submit();
  }

  renderDriverFields() {
    switch(this.props.selectedNode.driver) {
    case 'pxe_ipmitool':
      return <PXEAndIPMIToolDriverFields driver_info={this.props.selectedNode.driver_info}/>;
    default:
      return <PXEAndSSHDriverFields driver_info={this.props.selectedNode.driver_info}/>;
    }
  }

  render () {
    return (
      <Formsy.Form ref="nodeForm"
                   className="form-horizontal"
                   onValidSubmit={this.onNodeFormValidSubmit.bind(this)}
                   onInvalidSubmit={this.onNodeFormInvalidSubmit.bind(this)}
                   onValid={this.onValid.bind(this)}
                   onInvalid={this.onInvalid.bind(this)}>
        <h4>Node Detail</h4>
        <fieldset>
          <legend>Management</legend>
          <HorizontalSelect name="driver"
                            title="Driver"
                            inputColumnClasses="col-sm-7"
                            labelColumnClasses="col-sm-5"
                            value={this.props.selectedNode.driver}
                            options={this.driverOptions} />
          {this.renderDriverFields()}
        </fieldset>
        <fieldset>
          <legend>Networking</legend>
          <HorizontalInput name="nicMacAddress"
                           title="NIC MAC Address"
                           inputColumnClasses="col-sm-7"
                           labelColumnClasses="col-sm-5"
                           value={this.props.selectedNode.nicMacAddress}
                           validations={this.macAddressValidator}
                           validationError={this.macAddressValidatorMessage}
                           required/>
        </fieldset>
      </Formsy.Form>
    );
  }
}
RegisterNodeForm.propTypes = {
  onUpdateNode: React.PropTypes.func,
  selectedNode: React.PropTypes.object
};
