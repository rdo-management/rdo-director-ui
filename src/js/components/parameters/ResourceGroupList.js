import * as _ from 'lodash';
import React from 'react';

import ResourceGroupTab from './ResourceGroupTab';

export default class ResourceGroupList extends React.Component {
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
    let resourceGroupList = this.objectsToArray(this.props.nestedParameters)
      .map((resourceGroup, index) => {
        // Render tab if the resourceGroup has parameters or nested parameters
        if(!_.isEmpty(resourceGroup.Parameters) || resourceGroup.NestedParameters) {
          return (
            <ResourceGroupTab key={index}
                              name={resourceGroup.name}
                              description={resourceGroup.Description}
                              level={this.props.level}
                              nestedParameters={resourceGroup.NestedParameters}
                              activateTab={this.props.activateTab}
                              activeTab={this.props.activeTab}/>
          );
        }
      }
    );

    return (
      <div className={`item-group${this.props.expanded ? ' expanded' : ''}`}>
        {resourceGroupList}
      </div>
    );
  }
}
ResourceGroupList.propTypes = {
  activateTab: React.PropTypes.func,
  activeTab: React.PropTypes.string,
  description: React.PropTypes.string,
  expanded: React.PropTypes.bool,
  level: React.PropTypes.number,
  nestedParameters: React.PropTypes.object
};
