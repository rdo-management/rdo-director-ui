import React from 'react';
import TestUtils from 'react-addons-test-utils';

const NodesTable = require('../../../js/components/nodes/NodesTable');

const initialState = {
  filterString: '',
  sortBy: '',
  sortDir: 'asc'
};

const filterString = '1';

let data = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('NodesTable component', () => {
  let nodesTableVdom, nodesTableInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<NodesTable data={data}/>);
    nodesTableVdom = shallowRenderer.getRenderOutput();
    nodesTableInstance = shallowRenderer._instance._instance;
  });

  it('should render with initial state', () => {
    expect(nodesTableInstance.state).toEqual(initialState);
  });

  it('should render DataTable and pass data', () => {
    expect(nodesTableVdom.type.name).toEqual('DataTable');
    expect(nodesTableVdom.props.data).toEqual(data);
    expect(nodesTableVdom.props.noRowsRenderer.name).toBeDefined();
    expect(nodesTableVdom.props.children.length).toEqual(7);
  });

  it('should be able to filter rows', () => {
    spyOn(nodesTableInstance, '_filterData').and.callThrough();
    nodesTableInstance.onFilter(filterString);
    expect(nodesTableInstance.state).toEqual({ filterString: '1', sortBy: '', sortDir: 'asc' });
    expect(nodesTableInstance._filterData).toHaveBeenCalledWith('1', nodesTableInstance.props.data);
  });
});
