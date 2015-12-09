import * as _ from 'lodash';
import React from 'react';

import HorizontalInput from '../ui/forms/HorizontalInput';
import HorizontalStaticText from '../ui/forms/HorizontalStaticText';
import ParameterTabPaneGroupList from './ParameterTabPaneGroupList';

export default class ParametersTabPane extends React.Component {
  isTabActive() {
    return this.props.activeTab === this.props.name;
  }

  /**
  * Process the parameter, generate relevant input
  * As this method grows, extract it into separate ParameterProcessor service
  */
  _processParameter(parameter, index) {
    let value;
    let type = 'text';

    if(parameter.Value) {
      value = parameter.Value;
      if(_.isObject(parameter.Value)) {
        value = JSON.stringify(parameter.Value);
      }
      return (
        <HorizontalStaticText key={index}
                              title={parameter.Label}
                              text={value.toString()}
                              labelColumnClasses="col-sm-4"
                              valueColumnClasses="col-sm-8"/>
      );
    } else {

      if(_.isObject(parameter.Default)) {
        value = JSON.stringify(parameter.Default);
      }

      return (
        <HorizontalInput key={index}
                         name={parameter.name}
                         title={parameter.Label}
                         type={type}
                         description={parameter.Description}
                         value={value}
                         labelColumnClasses="col-sm-4"
                         inputColumnClasses="col-sm-8"/>
      );
    }
  }

  render() {
    // convert Parameters object to array
    let parameters = _.values(_.mapKeys(this.props.parameters, (value, key) => {
      return value.name = key;
    })).map((parameter, index) => {
      return this._processParameter(parameter, index);
    });

    return (
      <div className="tab-content">
        <div className={`tab-pane${this.isTabActive() ? ' active' : ''}`}>
          <h2>{this.props.name}</h2>
          {parameters}
        </div>
        {this.props.nestedParameters ? (
          <ParameterTabPaneGroupList nestedParameters={this.props.nestedParameters}
                                     activeTab={this.props.activeTab}/>
        ) : null}
      </div>
    );
  }
}
ParametersTabPane.propTypes = {
  activeTab: React.PropTypes.string,
  name: React.PropTypes.string,
  nestedParameters: React.PropTypes.object,
  parameters: React.PropTypes.object
};
