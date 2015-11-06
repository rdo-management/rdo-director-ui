import Formsy from 'formsy-react';
import React from 'react';

import EnvironmentConfigurationTopic from './EnvironmentConfigurationTopic';
import FormErrorList from '../ui/forms/FormErrorList';
// import KeystoneApiErrorHandler from '../services/KeystoneApiErrorHandler';

export default class EnvironmentConfiguration extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      formErrors: []
    };
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSubmit(formData, resetForm, invalidateForm) {
    console.log(formData);
    // TODO(jtomasek): Handle form submit and errors here
    // Sends API request with form data as param

    // this.disableButton();
    // KeystoneApiService.authenticateUser(formData.username, formData.password).then((response) => {
    //   LoginActions.loginUser(response.access);
    //   NotificationActions.notify({
    //     title: 'Login Successful',
    //     message: 'The user was logged in successfully',
    //     type: 'success'
    //   });
    // }).catch((error) => {
    //   this.enableButton();
    //   console.error('Error in handleLogin', error);
    //   let errorHandler = new KeystoneApiErrorHandler(error, Object.keys(this.refs.form.inputs));
    //   invalidateForm(errorHandler.formFieldErrors);
    //   this.setState({
    //     formErrors: errorHandler.errors
    //   });
    // });
  }

  render() {
    let topics = this.props.plan.capabilities.topics.map((topic, index) => {
      return (
        <EnvironmentConfigurationTopic key={index}
                                       title={topic.title}
                                       description={topic.description}
                                       environmentGroups={topic.environment_groups}/>
      );
    });

    return (
      <div>
        <h2>Environment Configuration</h2>
        <div className="row">
          <div className="col-sm-12">
            <FormErrorList errors={this.state.formErrors}/>
            <Formsy.Form ref="environmentConfigurationForm"
                         role="form"
                         className="form"
                         onSubmit={this.handleSubmit.bind(this)}
                         onValid={this.enableButton.bind(this)}
                         onInvalid={this.disableButton.bind(this)}>
              <div className="form-group">
                <div className="masonry-environment-topics">
                  {topics}
                </div>
              </div>
              <div className="form-group">
                <div className="submit">
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
EnvironmentConfiguration.propTypes = {
  plan: React.PropTypes.object
};
