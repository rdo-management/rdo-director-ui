import * as _ from 'lodash';
import Formsy from 'formsy-react';
import React from 'react';

import CapabilitiesMap from '../../data/CapabilitiesMap';
import EnvironmentConfigurationTopic from './EnvironmentConfigurationTopic';
import FormErrorList from '../ui/forms/FormErrorList';
import NotificationActions from '../../actions/NotificationActions';
import TripleOApiService from '../../services/TripleOApiService';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';

export default class EnvironmentConfiguration extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      formErrors: [],
      environmentConfiguration: {
        topics: []
      }
    };
  }

  componentDidMount() {
    // TODO(jtomasek): replace with
    // TripleOApiService.getEnvironments();
    this.setState({
      environmentConfiguration: CapabilitiesMap
    });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSubmit(formData, resetForm, invalidateForm) {
    console.log(formData);
    this.disableButton();
    TripleOApiService.updateEnvironments(formData).then((response) => {
      // TODO(jtomasek): we expect to receive updated environments mapping as a response
      // update current state with this data.
      // this.setState({ environmentConfiguration: response })
      NotificationActions.notify({
        title: 'Environment Configuration updated',
        message: 'The Environment Configuration has been successfully updated',
        type: 'success'
      });
    }).catch((error) => {
      this.enableButton();
      console.error('Error in EnvironmentConfiguration.handleSubmit', error);
      let errorHandler = new TripleOApiErrorHandler(error, Object.keys(this.refs.form.inputs));
      invalidateForm(errorHandler.formFieldErrors);
      this.setState({
        formErrors: errorHandler.errors
      });
    });
  }

  render() {
    let topics = this.state.environmentConfiguration.topics.map((topic, index) => {
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

/**
* requiresEnvironments validation
* Invalidates input if it is selected and environment it requires is not.
* example: validations="requiredEnvironments:['some_environment.yaml']"
*/
Formsy.addValidationRule('requiresEnvironments',
                         function (values, value, requiredEnvironmentFieldNames) {
  if(value) {
    return !_.filter(_.values(_.pick(values, requiredEnvironmentFieldNames)),
                     function(val){return val === false;}).length;
  }
  return true;
});
