import * as _ from 'lodash';
import Formsy from 'formsy-react';
import { Link } from 'react-router';
import React from 'react';

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
    }).catch(error => {
      this.props.history.pushState(null, this.props.parentPath);
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

  /**
  * Json parameter values are sent as string, this method parses those back to object
  */
  _jsonParseformData(formData) {
    return _.mapValues(formData, (value) => {
      try {
        return JSON.parse(value);
      } catch(e) {
        return value;
      }
    });
  }

  handleSubmit(formData, resetForm, invalidateForm) {
    this.disableButton();
    this.setState({ parametersLoaded: false });
    TripleOApiService.updatePlanParameters(this.props.currentPlanName,
                                           this._jsonParseformData(formData))
    .then((response) => {
      this.setState({
        parameters: response.parameters,
        parametersLoaded: true
      });
      this.props.history.pushState(null, this.props.parentPath);
      NotificationActions.notify({
        title: 'Parameters updated',
        message: 'The Deployment parameters have been successfully updated',
        type: 'success'
      });
    }).catch((error) => {
      this.enableButton();
      this.setState({ parametersLoaded: true });
      console.error('Error in Parameters.handleSubmit', error); //eslint-disable-line no-console
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
                <Link to={this.props.parentPath}
                      type="button"
                      className="close">
                  <span aria-hidden="true" className="pficon pficon-close"/>
                </Link>
                <h4 className="modal-title">Parameters Configuration</h4>
              </div>

              <Loader height={60}
                      loaded={this.state.parametersLoaded}>
                <ParameterTree parameters={this.state.parameters}
                               formErrors={this.state.formErrors}/>
              </Loader>

              <div className="modal-footer">
                <button type="submit" disabled={!this.state.canSubmit}
                        className="btn btn-primary">
                  Save Configuration
                </button>
                <Link to={this.props.parentPath} type="button" className="btn btn-default" >
                  Cancel
                </Link>
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
  history: React.PropTypes.object,
  parentPath: React.PropTypes.string.isRequired
};

Parameters.defaultProps = {
  parentPath: '/deployment-plan'
};
