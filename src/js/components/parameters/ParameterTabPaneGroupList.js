import * as _ from 'lodash';
import React from 'react';

import ParametersTabPane from './ParametersTabPane';

export default class ParameterTabPaneGroupList extends React.Component {
  /**
  * Turns object of objects into array of objects and adds each object key as
  * a name property
  */
  objectsToArray(object) {
    return _.values(_.mapKeys(object, (value, key) => {
      return value.name = key;
    }));
  }

  render() {
    let tabPaneGroupList = this.objectsToArray(this.props.nestedParameters)
      .map((resourceGroup, index) => {
        // Render tabPane if the resourceGroup has parameters or has nested parameters
        if(!_.isEmpty(resourceGroup.Parameters) || resourceGroup.NestedParameters) {
          return (
            <ParametersTabPane key={index}
                               name={resourceGroup.name}
                               nestedParameters={resourceGroup.NestedParameters}
                               parameters={resourceGroup.Parameters}
                               activeTab={this.props.activeTab}/>
          );
        }
      }
    );

    return (
      <div>
        {tabPaneGroupList}
      </div>
    );
  }
}
ParameterTabPaneGroupList.propTypes = {
  activeTab: React.PropTypes.string,
  nestedParameters: React.PropTypes.object
};
