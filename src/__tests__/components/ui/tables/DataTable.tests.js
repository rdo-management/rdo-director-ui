// import React from 'react';
// import TestUtils from 'react-addons-test-utils';
//
// const DataTable = require('../../../js/components/ui/tables/DataTable.js');
//
// describe('DataTable component', () => {
//   it('should ')
// });

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import DataTable from '../../../../js/components/ui/tables/DataTable';
import { DataTableCellLink } from '../../../../js/components/ui/tables/DataTableCells';
import { DataTableColumn,
         SortableDataTableColumn } from '../../../../js/components/ui/tables/DataTableColumns';

const initialState = {
  filterString: '',
  sortBy: '',
  sortDir: 'asc'
};

const data = [
  { uuid: 1, provision_state: 'failed' },
  { uuid: 2, provision_state: 'success' }
];

const filterEvent = { target: { value: '1' } };

const mockNoRowsRenderer = function() {
  return 'There are no items in data';
};

describe('DataTable component', () => {
  let DataTableVdom, DataTableInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <DataTable data={data} noRowsRenderer={mockNoRowsRenderer}>
        <SortableDataTableColumn dataKey="uuid"
                                 key="uuid"
                                 label="UUID"
                                 cellRenderer={DataTableCellLink}
                                 filterable/>
        <DataTableColumn dataKey="provision_state"
                         key="provision_state"
                         label="State"/>
      </DataTable>
    );
    DataTableVdom = shallowRenderer.getRenderOutput();
    DataTableInstance = shallowRenderer._instance._instance;
  });

  it('should render correctly', () => {
    expect(DataTableVdom.props.className).toBe('dataTables_wrapper');
    let tableHeader = DataTableVdom.props.children[0];
    expect(tableHeader.props.className).toBe('dataTables_header');
    let tableFilterInput = tableHeader.props.children[0];
    expect(tableFilterInput.props.className).toBe('dataTables_filter');
    let tableInfo = tableHeader.props.children[1];
    expect(tableInfo.props.className).toBe('dataTables_info');
    expect(tableInfo).toEqual(
      <div className="dataTables_info">
        Showing <b>{data.length}</b> of <b>{data.length}</b> items
      </div>
    );

    let table = DataTableVdom.props.children[1];
    expect(table.props.className).toBe('table-responsive');
  });

  it('should render with initial state', () => {
    expect(DataTableInstance.state).toEqual(initialState);
  });

  it('should be able to collect columns', () => {
    let columns = DataTableInstance._getColumns();
    expect(columns.length).toEqual(2);
    expect(columns[0].props.onSort).toBeDefined();
  });

  it('should be able to collect filterable columns', () => {
    expect(DataTableInstance._getFilterableColumns().length).toEqual(1);
  });

  it('should be able to collect filterable columns data keys', () => {
    expect(DataTableInstance._getFilterableColumnsDataKeys().length).toEqual(1);
    expect(DataTableInstance._getFilterableColumnsDataKeys()).toEqual(['uuid']);
  });

  it('should be able to filter rows', () => {
    spyOn(DataTableInstance, '_filterRows').and.callThrough();
    DataTableInstance.onFilterTable(filterEvent);
    expect(DataTableInstance.state).toEqual({ filterString: '1', sortBy: '', sortDir: 'asc' });
    expect(DataTableInstance._filterRows).toHaveBeenCalledWith('1', DataTableInstance.props.data);
  });

  it('should be able to sort rows', () => {
    spyOn(DataTableInstance, '_sortRows').and.callThrough();
    DataTableInstance.onSortTable('uuid', 'asc');
    expect(DataTableInstance._sortRows).toHaveBeenCalledWith(DataTableInstance.state.sortBy,
                                                             DataTableInstance.state.sortDir,
                                                             DataTableInstance.props.data);
  });
});
