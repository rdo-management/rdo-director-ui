import React from 'react';
import TestUtils from 'react-addons-test-utils';

import IronicApiService from '../../../js/services/IronicApiService';
import ProvisionedNodesTabPane from '../../../js/components/nodes/ProvisionedNodesTabPane';

let nodes = {
  provisioned: [
    { uuid: 1 },
    { uuid: 2 }
  ]
};

describe('ProvisionedNodesTabPane component', () => {
  let tabPaneVdom, tabPaneInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ProvisionedNodesTabPane nodes={nodes}/>);
    tabPaneVdom = shallowRenderer.getRenderOutput();
    tabPaneInstance = shallowRenderer._instance._instance;
  });

  it('should render NodesTable and pass nodes as data prop', () => {
    expect(tabPaneVdom.type.name).toEqual('NodesTable');
    expect(tabPaneVdom.props.data).toEqual(nodes.provisioned);
  });

  it('should issue a request to list Nodes on when mounted', () => {
    spyOn(IronicApiService, 'getNodes');
    tabPaneInstance.componentDidMount();
    expect(IronicApiService.getNodes).toHaveBeenCalled();
  });
});
