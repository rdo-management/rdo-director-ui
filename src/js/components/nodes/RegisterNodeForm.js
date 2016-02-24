import { fromJS } from 'immutable';
import Formsy from 'formsy-react';
import React from 'react';

import HorizontalInput from '../ui/forms/HorizontalInput';
import HorizontalSelect from '../ui/forms/HorizontalSelect';
import { NodeToRegister } from '../../immutableRecords/nodes';
import PXEAndSSHDriverFields from './driver_fields/PXEAndSSHDriverFields';
import PXEAndIPMIToolDriverFields from './driver_fields/PXEAndIPMIToolDriverFields';

export default class RegisterNodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: 'pxe_ssh'
    };

    this.driverOptions = ['pxe_ipmitool', 'pxe_ssh'];

    this.macAddressValidator = {
      matchRegexp: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
    };
    this.macAddressValidatorMessage = 'Please enter a valid MAC Address';
  }

  onNodeFormValidSubmit(formData, resetForm, invalidateForm) {
    let updatedNode = formData;
    updatedNode.id = this.props.selectedNode.id;
    if (this.props.selectedNode.driver !== formData.driver) {
      updatedNode.driver_info = {};
    }
    updatedNode.valid = true;
    this.props.onUpdateNode(updatedNode);
  }

  onNodeFormInvalidSubmit(formData, resetForm, invalidateForm) {
    let updatedNode = formData;
    updatedNode.id = this.props.selectedNode.id;
    if (this.props.selectedNode.driver !== formData.driver) {
      updatedNode.driver_info = {};
    }
    updatedNode.valid = false;
    this.props.onUpdateNode(updatedNode);
  }

  onChange(currentValues, isChanged) {
    if (isChanged) {
      this.refs.nodeForm.submit();
    }
  }

  // onValid() {
  //   this.refs.nodeForm.submit();
  // }
  //
  // onInvalid() {
  //   this.refs.nodeForm.submit();
  // }

  changeDriver(currentValues, isChanged) {
    this.setState({driver: currentValues.driver});
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
      <div>
        <h4>Node Detail</h4>
        {/*<Formsy.form ref="driverSelectForm"
                     className="form-horizontal"
                     onChange={this.changeDriver.bind(this)}>
          <HorizontalSelect name="driver"
                            title="Driver"
                            inputColumnClasses="col-sm-7"
                            labelColumnClasses="col-sm-5"
                            value={this.state.driver}
                            options={this.driverOptions} />

        </Formsy.form>*/}
        <Formsy.Form ref="nodeForm"
                     className="form-horizontal"
                     onChange={this.onChange.bind(this)}
                     onValidSubmit={this.onNodeFormValidSubmit.bind(this)}
                     onInvalidSubmit={this.onNodeFormInvalidSubmit.bind(this)}>
                     {/*onValid={this.onValid.bind(this)}
                     onInvalid={this.onInvalid.bind(this)}>*/}
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
      </div>
    );
  }
}
RegisterNodeForm.propTypes = {
  onUpdateNode: React.PropTypes.func,
  selectedNode: React.PropTypes.object
};
