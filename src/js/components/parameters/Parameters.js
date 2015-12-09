import Formsy from 'formsy-react';
import { Link } from 'react-router';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import Loader from '../ui/Loader';
import NotificationActions from '../../actions/NotificationActions';
import ParameterTree from './ParameterTree';
import TripleOApiService from '../../services/TripleOApiService';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';

export default class Parameters extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      formErrors: [],
      parameters: {},
      parametersLoaded: false
    };
  }

  componentDidMount() {
    this.setState({ parametersLoaded: false });
    TripleOApiService.getPlanParameters(this.props.currentPlanName).then(response => {
      this.setState({
        parameters: response.parameters,
        parametersLoaded: true
      });
      console.log(response.parameters);
    }).catch(error => {
      this.props.history.pushState(null, '/overview');
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
      console.error('Error in Parameters.handleSubmit', error);
      let errorHandler = new TripleOApiErrorHandler(error,
                               Object.keys(this.refs.parameterConfigurationForm.inputs));
      invalidateForm(errorHandler.formFieldErrors);
      this.setState({
        formErrors: errorHandler.errors
      });
    });
  }

  render() {
    return (
      <div>
        <div className="modal modal-routed in" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <Formsy.Form ref="parameterConfigurationForm"
                           role="form"
                           className="form form-horizontal"
                           onSubmit={this.handleSubmit.bind(this)}
                           onValid={this.enableButton.bind(this)}
                           onInvalid={this.disableButton.bind(this)}>
              <div className="modal-header">
                <Link to="/overview"
                      type="button"
                      className="close">
                  <span aria-hidden="true" className="pficon pficon-close"/>
                </Link>
                <h4 className="modal-title">Parameters Configuration</h4>
              </div>

              <Loader height={60}
                      loaded={this.state.parametersLoaded}>
                <FormErrorList errors={this.state.formErrors}/>
                <ParameterTree parameters={this.state.parameters}/>
              </Loader>

              <div className="modal-footer">
                <button type="submit" disabled={!this.state.canSubmit}
                        className="btn btn-primary">
                  Save Configuration
                </button>
                <Link to="/overview" type="button" className="btn btn-default" >Cancel</Link>
              </div>
              </Formsy.Form>
            </div>
          </div>
        </div>
        <div className="modal-backdrop in"></div>
      </div>
    );
  }
}
Parameters.propTypes = {
  currentPlanName: React.PropTypes.string,
  history: React.PropTypes.object
};
