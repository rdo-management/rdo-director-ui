import React from 'react';
import TestUtils from 'react-addons-test-utils';

const IronicApiService = require('../../../js/services/IronicApiService');
const NodesStore = require('../../../js/stores/NodesStore');

import Nodes from '../../../js/components/nodes/Nodes';

let nodesInstance;

let nodesStoreState = {
  nodes: {
    all: [],
    registered: [],
    discovered: [],
    provisioned: [],
    maintenance: []
  }
};

describe('Nodes Component', () => {
  let NodesVdom, NodesInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Nodes/>);
    NodesVdom = shallowRenderer.getRenderOutput();
    NodesInstance = shallowRenderer._instance._instance;
  });

  it('should render Nodes nav tabs', () => {
  });

  it('should render tab-pane', () => {
  });

  it('should listen to NodesStore changes', () => {
  });

  it('should get nodes from NodesStore and store them in state on change in NodesStore', () => {
  });
});
