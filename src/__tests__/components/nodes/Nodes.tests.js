import React from 'react';
import TestUtils from 'react-addons-test-utils';

const IronicApiService = require('../../../js/services/IronicApiService');
// const NodesStore = require('../../../js/stores/NodesStore');

import Nodes from '../../../js/components/nodes/Nodes';

// let nodesStoreState = {
//   nodes: {
//     all: [],
//     registered: [],
//     introspected: [],
//     provisioned: [],
//     maintenance: []
//   }
// };

describe('Nodes Component', () => {
  let NodesVdom, NodesInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Nodes/>);
    NodesVdom = shallowRenderer.getRenderOutput();
    NodesInstance = shallowRenderer._instance._instance;
  });

  // TODO(jtomasek): not sure how to mock children passed by react router
  xit('should render Nodes nav tabs', () => {
    expect(NodesVdom).toExist();
  });

  xit('should render tab-pane', () => {
  });

  xit('should listen to NodesStore changes', () => {
  });

  xit('should get nodes from NodesStore and store them in state on change in NodesStore', () => {
  });

  xit('should issue a request to list Nodes on when mounted', () => {
    spyOn(IronicApiService, 'handleGetNodes');
    NodesInstance.componentDidMount();
    expect(IronicApiService.handleGetNodes).toHaveBeenCalled();
  });
});
