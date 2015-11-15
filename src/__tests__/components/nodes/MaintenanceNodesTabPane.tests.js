import React from 'react';
import TestUtils from 'react-addons-test-utils';

import IronicApiService from '../../../js/services/IronicApiService';
import MaintenanceNodesTabPane from '../../../js/components/nodes/MaintenanceNodesTabPane';

let nodes = {
  maintenance: [
    { uuid: 1 },
    { uuid: 2 }
  ]
};

describe('MaintenanceNodesTabPane component', () => {
  let tabPaneVdom, tabPaneInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<MaintenanceNodesTabPane nodes={nodes}/>);
    tabPaneVdom = shallowRenderer.getRenderOutput();
    tabPaneInstance = shallowRenderer._instance._instance;
  });

  it('should render NodesTable and pass nodes as data prop', () => {
    expect(tabPaneVdom.type.name).toEqual('NodesTable');
    expect(tabPaneVdom.props.data).toEqual(nodes.maintenance);
  });

  it('should issue a request to list Nodes on when mounted', () => {
    spyOn(IronicApiService, 'handleGetNodes');
    tabPaneInstance.componentDidMount();
    expect(IronicApiService.handleGetNodes).toHaveBeenCalled();
  });
});
