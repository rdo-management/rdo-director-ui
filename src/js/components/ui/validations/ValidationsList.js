import React from 'react';

import ValidationsStore from '../../../stores/ValidationsStore';
import ValidationType from './ValidationType';
import MockValidations from '../../../mock/mockValidations';

var mockValidations = true;

export default class ValidationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationTypes: []
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this._onChange();
    ValidationsStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    let validationTypes = MockValidations.validations;
    if (!mockValidations) {
      validationTypes = ValidationsStore.getState().validations;
    }
    this.setState({validationTypes: validationTypes});
  }

  onClose() {
    let list = document.getElementById('validationsList');
    if (list) {
      if (list.classList.contains('opened')) {
        list.classList.remove('opened');
        list.classList.add('closed');
      }
    }
  }

  render() {
    let validationTypesComponents = this.state.validationTypes.map((validationType, index) => {
      return (
        <ValidationType key={index} validationType={validationType} />
      );
    });

    return (
      <div className="validations-list container-fluid closed" id="validationsList">
        <div className="row validations-header">
          <span className="validations-title">Validations</span>
          <button className="close" onClick={this.onClose.bind(this)}>x</button>
        </div>
        <div className="row validations-outer-container">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {validationTypesComponents}
          </div>
        </div>
      </div>
    );
  }
}
