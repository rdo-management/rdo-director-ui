import * as _ from 'lodash';
import Formsy from 'formsy-react';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import HorizontalInput from '../ui/forms/HorizontalInput';
import NotificationActions from '../../actions/NotificationActions';
import TripleOApiService from '../../services/TripleOApiService';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';

export default class Parameters extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      formErrors: [],
      parameters: {}
    };
  }

  componentDidMount() {
    TripleOApiService.getPlanParameters(this.props.currentPlanName).then(response => {
      this.setState({ parameters: response.parameters });
    }).catch(error => {
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSubmit(formData, resetForm, invalidateForm) {
    this.disableButton();
    TripleOApiService.updatePlanParameters(this.props.currentPlanName, formData)
    .then((response) => {
      this.setState({ parameters: response.parameters });
      NotificationActions.notify({
        title: 'Parameters updated',
        message: 'The Deployment parameters have been successfully updated',
        type: 'success'
      });
    }).catch((error) => {
      this.enableButton();
      console.error('Error in Parameters.handleSubmit', error); //eslint-disable-line no-console
      let errorHandler = new TripleOApiErrorHandler(error,
                               Object.keys(this.refs.parameterConfigurationForm.inputs));
      invalidateForm(errorHandler.formFieldErrors);
      this.setState({
        formErrors: errorHandler.errors
      });
    });
  }

  /**
  * Process the parameter, generate relevant input
  * As this method groows, extract it into separate ParameterProcessor service
  */
  _processParameter(parameter, index) {
    let value = parameter.Default;
    let type = 'text';

    if(_.isObject(parameter.Default)) {
      value = JSON.stringify(parameter.Default);
    }

    return (
      <HorizontalInput key={index}
                       name={parameter.name}
                       title={parameter.Label}
                       type={type}
                       description={parameter.Description}
                       value={value}/>
    );
  }

  render() {
    // convert Parameters object to array
    let parameters = _.values(_.mapKeys(this.state.parameters.Parameters, (value, key) => {
      return value.name = key;
    })).map((parameter, index) => {
      return this._processParameter(parameter, index);
    });

    return (
      <div>
        <h2>Service Configuration</h2>
        <div className="row">
          <div className="col-sm-12">
            <FormErrorList errors={this.state.formErrors}/>
            <Formsy.Form ref="parameterConfigurationForm"
                         role="form"
                         className="form form-horizontal"
                         onSubmit={this.handleSubmit.bind(this)}
                         onValid={this.enableButton.bind(this)}
                         onInvalid={this.disableButton.bind(this)}>
              {parameters}
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" disabled={!this.state.canSubmit}
                          className="btn btn-primary btn-lg">
                    Save Configuration
                  </button>
                </div>
              </div>
            </Formsy.Form>
          </div>
        </div>
      </div>
    );
  }
}
Parameters.propTypes = {
  currentPlanName: React.PropTypes.string
};
