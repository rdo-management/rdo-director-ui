import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import ValidationsApiService from '../../services/ValidationsApiService';
import ValidationsStore from '../../stores/ValidationsStore';

export default class Validations extends React.Component {
  constructor() {
    super();
    this.state = {
      validationTypes: ValidationsStore.getState().validationTypes
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    ValidationsApiService.handleGetValidations();
    ValidationsStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ validationTypes: ValidationsStore.getState().validationTypes });
  }

  render() {
    console.log(this.state.validationTypes);
    return (
      <PageHeader>Validations</PageHeader>
    );
  }
}
