import React from 'react';

import ValidationsApiService from '../services/ValidationsApiService';
import ValidationsStore from '../stores/ValidationsStore';

import ValidationsIndicator from './ui/validations/ValidationsIndicator';
import ValidationsList from './ui/validations/ValidationsList';

import MockValidations from '../mock/mockValidations';
var mockValidations = true;

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showValidations: false,
      validationTypes: []
    };

    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this._onChange();

    ValidationsApiService.handleGetValidations();
    ValidationsStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    if (mockValidations) {
      this.setState({validationTypes: MockValidations.validations});
      return;
    }

    this.setState({validationTypes: ValidationsStore.getState().validations});
  }

  toggleValidationsList(e) {
    e.preventDefault();

    this.setState({showValidations: !this.state.showValidations});
  }

  closeValidationsList(e) {
    e.preventDefault();

    this.setState({showValidations: false});
  }

  render() {
    return (
      <footer className="navbar-fixed-bottom wrapper-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <ValidationsIndicator validationTypes={this.state.validationTypes} onClick={this.toggleValidationsList.bind(this)}/>
              <p className="pull-right">&copy; 2015 Company Name</p>
            </div>
          </div>
        </div>
        <ValidationsList active={this.state.showValidations} validationTypes={this.state.validationTypes} onClose={this.closeValidationsList.bind(this)}/>
      </footer>
    );
  }
}
