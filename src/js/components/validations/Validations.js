import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import ValidationsApiService from '../../services/ValidationsApiService';
import ValidationsStore from '../../stores/ValidationsStore';

export default class Validations extends React.Component {
  constructor() {
    super();
    this.state = {
      validations: ValidationsStore.getState().validations
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
    this.setState({ validations: ValidationsStore.getState().validations });
  }

  render() {
    console.log(this.state.validations);
    return (
      <PageHeader>Validations</PageHeader>
    );
  }
}
