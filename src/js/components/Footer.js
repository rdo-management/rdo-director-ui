import React from 'react';

import NotificationActions from '../actions/NotificationActions';
import ValidationsActions from '../actions/ValidationsActions';
import ValidationsApiService from '../services/ValidationsApiService';
import ValidationsStore from '../stores/ValidationsStore';
import ValidationsIndicator from './validations/ValidationsIndicator';
import ValidationsList from './validations/ValidationsList';
import ValidationsApiErrorHandler from '../services/ValidationsApiErrorHandler';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showValidations: false,
      validationStages: ValidationsStore.getState().stages
    };

    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    ValidationsStore.addChangeListener(this.changeListener);
    this.getValidationStages();
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({validationStages: ValidationsStore.getState().stages});
  }

  getValidationStages() {
    ValidationsApiService.getStages().then((response) => {
      ValidationsActions.listStages(response);
      console.log(response);
    }).catch((error) => {
      console.error('Error in Footer.getValidationStages', error);
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
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
              <ValidationsIndicator validationStages={this.state.validationStages}
                                    onClick={this.toggleValidationsList.bind(this)}/>
              <p className="pull-right">&copy; 2015 Company Name</p>
            </div>
          </div>
        </div>
        <ValidationsList active={this.state.showValidations}
                         validationStages={this.state.validationStages}
                         onClose={this.closeValidationsList.bind(this)}/>
      </footer>
    );
  }
}
