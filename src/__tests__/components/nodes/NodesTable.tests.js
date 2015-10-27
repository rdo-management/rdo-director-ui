import * as _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

const NodesTable = require('../../../js/components/nodes/NodesTable');

let data = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('NodesTable component', () => {
  let nodesTableVdom;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NodesTable data={data}/>);
    nodesTableVdom = shallowRenderer.getRenderOutput();
  });

  it('should render DataTable and pass data', () => {
    expect(nodesTableVdom.type.name).toEqual('DataTable');
    expect(nodesTableVdom.props.data).toEqual(data);
    expect(nodesTableVdom.props.noRowsRenderer.name).toEqual('bound renderNoNodesFound');
    expect(nodesTableVdom.props.children.length).toEqual(4);
  });

  it('should render a link on uuid column', () => {
    let uuidColumn = _.find(nodesTableVdom.props.children, 'props.dataKey', 'uuid');
    expect(uuidColumn.props.cellRenderer.name).toEqual('DataTableCellLink');
  });
});
