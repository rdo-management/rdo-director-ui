import React from 'react';
import TestUtils from 'react-addons-test-utils';

import IronicApiService from '../../../js/services/IronicApiService';
import DiscoveredNodesTabPane from '../../../js/components/nodes/DiscoveredNodesTabPane';

let nodes = {
  discovered: [
    { uuid: 1 },
    { uuid: 2 }
  ]
};

describe('DiscoveredNodesTabPane component', () => {
  let tabPaneVdom, tabPaneInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<DiscoveredNodesTabPane nodes={nodes}/>);
    tabPaneVdom = shallowRenderer.getRenderOutput();
    tabPaneInstance = shallowRenderer._instance._instance;
  });

  it('should render NodesTable and pass nodes as data prop', () => {
    expect(tabPaneVdom.type.name).toEqual('NodesTable');
    expect(tabPaneVdom.props.data).toEqual(nodes.discovered);
  });

  it('should issue a request to list Nodes on when mounted', () => {
    spyOn(IronicApiService, 'getNodes');
    tabPaneInstance.componentDidMount();
    expect(IronicApiService.getNodes).toHaveBeenCalled();
  });
});
