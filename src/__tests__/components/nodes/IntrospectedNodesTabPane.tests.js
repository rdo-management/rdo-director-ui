import React from 'react';
import TestUtils from 'react-addons-test-utils';

import IntrospectedNodesTabPane from '../../../js/components/nodes/IntrospectedNodesTabPane';

let nodes = {
  introspected: [
    { uuid: 1 },
    { uuid: 2 }
  ]
};

describe('IntrospectedNodesTabPane component', () => {
  let tabPaneVdom;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<IntrospectedNodesTabPane nodes={nodes}/>);
    tabPaneVdom = shallowRenderer.getRenderOutput();
  });

  it('should render NodesTable and pass nodes as data prop', () => {
    expect(tabPaneVdom.type.name).toEqual('NodesTable');
    expect(tabPaneVdom.props.data).toEqual(nodes.introspected);
  });
});
