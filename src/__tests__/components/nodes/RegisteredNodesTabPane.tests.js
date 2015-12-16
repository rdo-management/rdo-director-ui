import React from 'react';
import TestUtils from 'react-addons-test-utils';

import RegisteredNodesTabPane from '../../../js/components/nodes/RegisteredNodesTabPane';

const nodes = {
  registered: [
    { uuid: 1 },
    { uuid: 2 }
  ]
};

describe('RegisteredNodesTabPane component', () => {
  let tabPaneVdom;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<RegisteredNodesTabPane nodes={nodes}/>);
    tabPaneVdom = shallowRenderer.getRenderOutput();
    /* TODO(jtomasek): replace this with shallowRenderer.getMountedInstance() when it is available
       https://github.com/facebook/react/pull/4918/files */
    // tabPaneInstance = shallowRenderer._instance._instance;
  });

  it('should render NodesTable and pass nodes as data prop', () => {
    expect(tabPaneVdom.props.children[0].type.name).toEqual('NodesTable');
    expect(tabPaneVdom.props.children[0].props.data).toEqual(nodes.registered);
  });
});
