import * as _ from 'lodash';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import React from 'react';

import EnvironmentConfigurationActions from '../../actions/EnvironmentConfigurationActions';
import EnvironmentConfigurationTopic from './EnvironmentConfigurationTopic';
import FormErrorList from '../ui/forms/FormErrorList';
import Loader from '../ui/Loader';
import Tab from '../ui/Tab';
import TabPane from '../ui/TabPane';

class EnvironmentConfiguration extends React.Component {
  constructor() {
    super();
    this.state = {
      canSubmit: false,
      formErrors: [],
      activeTab: undefined
    };
  }

  componentDidMount() {
    this.props.fetchEnvironmentConfiguration(this.props.currentPlanName);
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
    this.props.updateEnvironmentConfiguration(
      this.props.currentPlanName,
      data,
      this.props.parentPath
    );

    // TODO(flfuchs) implement environmentUpdateFaild action for error handling
    /*
      let errorHandler = new TripleOApiErrorHandler(
        error,Object.keys(this.refs.environmentConfigurationForm.inputs));
      invalidateForm(errorHandler.formFieldErrors);
      this.setState({
        formErrors: errorHandler.errors
      });
    */
  }

  activateTab(tabName, e) {
    e.preventDefault();
    this.setState({ activeTab: tabName });
  }

  isTabActive(tabName) {
    let firstTabName = _.camelCase(
      this.props.environmentConfiguration.get('topics').first().get('title')
    );
    let currentTab = this.state.activeTab || firstTabName;
    return currentTab === tabName;
  }

  render() {
    let topics = this.props.environmentConfiguration.get('topics').toArray().map((topic, index) => {
      let tabName = _.camelCase(topic.get('title'));
      return (
        <TabPane isActive={this.isTabActive(tabName)}
                 key={index}>
          <EnvironmentConfigurationTopic key={index}
                                         title={topic.get('title')}
                                         description={topic.get('description')}
                                         environmentGroups={topic.get('environment_groups')}/>
        </TabPane>
      );
    });

    let topicsArray = this.props.environmentConfiguration.get('topics').toArray();
    let topicTabs = topicsArray.map((topic, index) => {
      let tabName = _.camelCase(topic.get('title'));
      return (
        <Tab key={index} isActive={this.isTabActive(tabName)}>
          <a href="" onClick={this.activateTab.bind(this, tabName)}>
            {topic.get('title')}
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
                  <Link to={this.props.parentPath}
                        type="button"
                        className="close">
                    <span aria-hidden="true" className="pficon pficon-close"/>
                  </Link>
                  <h4 className="modal-title">Environment Configuration</h4>
                </div>
                <div className="modal-body">

                  <Loader height={60}
                          loaded={this.props.isLoaded}>
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
EnvironmentConfiguration.propTypes = {
  currentPlanName: React.PropTypes.string,
  environmentConfiguration: ImmutablePropTypes.map,
  fetchEnvironmentConfiguration: React.PropTypes.func,
  isLoaded: React.PropTypes.bool,
  location: React.PropTypes.object,
  parentPath: React.PropTypes.string.isRequired,
  updateEnvironmentConfiguration: React.PropTypes.func
};

EnvironmentConfiguration.defaultProps = {
  parentPath: '/deployment-plan'
};

function mapStateToProps(state) {
  return {
    currentPlanName: state.plans.get('currentPlanName'),
    environmentConfiguration: state.environmentConfiguration.get('entity'),
    isLoaded: state.environmentConfiguration.get('isLoaded')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEnvironmentConfiguration: planName => {
      dispatch(EnvironmentConfigurationActions.fetchEnvironmentConfiguration(planName));
    },
    updateEnvironmentConfiguration: (planName, data, parentPath) => {
      dispatch(EnvironmentConfigurationActions.updateEnvironmentConfiguration(
        planName, data, parentPath
      ));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentConfiguration);

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
