import * as _ from 'lodash';
import Formsy from 'formsy-react';
import { Link } from 'react-router';
import React from 'react';

import EnvironmentConfigurationTopic from './EnvironmentConfigurationTopic';
import FormErrorList from '../ui/forms/FormErrorList';
import Loader from '../ui/Loader';
import Tab from '../ui/Tab';
import TabPane from '../ui/TabPane';
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
      },
      activeTab: undefined,
      environmentConfigurationLoaded: false
    };
  }

  componentDidMount() {
    this._fetchEnvironmentConfiguration();
  }

  _fetchEnvironmentConfiguration() {
    this.setState({ environmentConfigurationLoaded: false });
    TripleOApiService.getPlanEnvironments(this.props.currentPlanName).then((response) => {
      this.setState({
        environmentConfiguration: response.environments,
        environmentConfigurationLoaded: true
      });
    }).catch((error) => {
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

  /*
  * Formsy splits data into objects by '.', file names include '.'
  * so we need to convert data back to e.g. { filename.yaml: true, ... }
  */
  _convertFormData(formData) {
    return _.mapValues(_.mapKeys(formData, (value, key) => {
      return key+'.yaml';
    }), (value) => {
      return value.yaml;
    });
  }

  handleSubmit(formData, resetForm, invalidateForm) {
    let data = this._convertFormData(formData);
    this.disableButton();
    TripleOApiService.updatePlanEnvironments(this.props.currentPlanName, data).then((response) => {
      this.setState({ environmentConfiguration: response.environments });
      this.props.history.pushState(null, '/overview');
      NotificationActions.notify({
        title: 'Environment Configuration updated',
        message: 'The Environment Configuration has been successfully updated',
        type: 'success'
      });
    }).catch((error) => {
      console.error('Error in EnvironmentConfiguration.handleSubmit', error);
      let errorHandler = new TripleOApiErrorHandler(error, Object.keys(this.refs.environmentConfigurationForm.inputs));
      invalidateForm(errorHandler.formFieldErrors);
      this.setState({
        formErrors: errorHandler.errors
      });
    });
  }

  activateTab(tabName, e) {
    e.preventDefault();
    this.setState({ activeTab: tabName });
  }

  isTabActive(tabName) {
    let firstTabName = _.camelCase(_.first(this.state.environmentConfiguration.topics).title);
    let currentTab = this.state.activeTab || firstTabName;
    return currentTab === tabName;
  }

  render() {
    let topics = this.state.environmentConfiguration.topics.map((topic, index) => {
      let tabName = _.camelCase(topic.title);
      return (
        <TabPane isActive={this.isTabActive(tabName)}
                 key={index}>
          <EnvironmentConfigurationTopic key={index}
                                         title={topic.title}
                                         description={topic.description}
                                         environmentGroups={topic.environment_groups}/>
        </TabPane>
      );
    });

    let topicTabs = this.state.environmentConfiguration.topics.map((topic, index) => {
      let tabName = _.camelCase(topic.title);
      return (
        <Tab key={index} isActive={this.isTabActive(tabName)}>
          <a href="" onClick={this.activateTab.bind(this, tabName)}>
            {topic.title}
          </a>
        </Tab>
      );
    });

    return (
      <div>
        <div className="modal modal-routed in" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <Formsy.Form ref="environmentConfigurationForm"
                           role="form"
                           className="form"
                           onSubmit={this.handleSubmit.bind(this)}
                           onValid={this.enableButton.bind(this)}
                           onInvalid={this.disableButton.bind(this)}>
                <div className="modal-header">
                  <Link to="/overview"
                        type="button"
                        className="close">
                    <span aria-hidden="true" className="pficon pficon-close"/>
                  </Link>
                  <h4 className="modal-title">Environment Configuration</h4>
                </div>
                <div className="modal-body">

                  <Loader height={60}
                          loaded={this.state.environmentConfigurationLoaded}>
                    <FormErrorList errors={this.state.formErrors}/>
                    <div className="row">
                      <div className="col-xs-5">
                        <ul className="nav nav-pills nav-stacked nav-arrows">
                          {topicTabs}
                        </ul>
                      </div>
                      <div className="col-xs-7">
                        <div className="tab-content">
                          {topics}
                        </div>
                      </div>
                    </div>
                  </Loader>

                </div>
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
EnvironmentConfiguration.propTypes = {
  currentPlanName: React.PropTypes.string,
  history: React.PropTypes.object,
  location: React.PropTypes.object
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
