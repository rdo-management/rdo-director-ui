import * as _ from 'lodash';
import React from 'react';
import invariant from 'invariant';

import DataTableRow from './DataTableRow';

export default class DataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      filterString: '',
      sortBy: '',
      sortDir: 'asc'
    };
  }

  componentDidMount() {
    this._setDefaultSorting();
  }

  _getColumns() {
    let columns = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child == null) {
        return;
      }
      invariant(
        child.type.name === 'DataTableColumn' ||
        child.type.name === 'SortableDataTableColumn',
        'DataTable child type should be <DataTableColumn /> or <SortableDataTableColumn />'
      );
      if (child.type.name === 'SortableDataTableColumn') {
        columns.push(React.cloneElement(child, {
          onSort: this.onSortTable.bind(this),
          sortBy: this.state.sortBy,
          sortDir: this.state.sortDir
        }));
      } else {
        columns.push(child);
      }
    });
    return columns;
  }

  onFilterTable(event) {
    this.setState({
      filterString: event.target.value
    });
  }

  _getFilterableColumns() {
    return _.filter(this._getColumns(), 'props.filterable', true);
  }

  _getFilterableColumnsDataKeys() {
    return _.pluck(this._getFilterableColumns(), ['props', 'dataKey']);
  }


  _filterRows(filterString, rows) {
    let dataKeys = this._getFilterableColumnsDataKeys();
    return filterString ? rows.filter((row) => {
      let result = dataKeys.filter((dataKey) => {
        return _.includes(row[dataKey], filterString.toLowerCase());
      });
      return result.length > 0;
    }) : rows;
  }

  _setDefaultSorting() {
    let firstSortableColumn = _.find(_.filter(this._getColumns(),
                                              'type.name',
                                              'SortableDataTableColumn'));
    this.onSortTable(firstSortableColumn.props.dataKey, firstSortableColumn.props.defaultSortDir);
  }

  onSortTable(sortBy, sortDir) {
    this.setState({
      sortBy: sortBy,
      sortDir: sortDir
    });
  }

  _sortRows(sortBy, sortDir, rows) {
    return sortBy ? _.sortByOrder(rows, sortBy, sortDir) : rows;
  }

  _renderEmptyTable(columns) {
    return this.props.noRowsRenderer();
  }

  render() {
    let columns = this._getColumns();
    let filterableColumnsTitles = _.pluck(this._getFilterableColumns(), ['props', 'label']);
    let filteredRows = this._filterRows(this.state.filterString, this.props.data);
    let sortedRows = this._sortRows(this.state.sortBy, this.state.sortDir, filteredRows);

    let rows = sortedRows.map((rowData, index) => {
      return (
        <DataTableRow key={index} columns={columns} rowData={rowData}/>
      );
    });

    return (
      <div className="dataTables_wrapper">
        <div className="dataTables_header">
          <div className="dataTables_filter">
            <label>
              <input type="search"
                     className=""
                     placeholder={'Filter by ' + filterableColumnsTitles.join(', ')}
                     title={'Filter by ' + filterableColumnsTitles.join(', ')}
                     value={this.state.filterString}
                     onChange={this.onFilterTable.bind(this)}/>
            </label>
          </div>
          <div className="dataTables_info">
            Showing <b>{rows.length}</b> of <b>{this.props.data.length}</b> items
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-stripped table-bordered datatable" role="grid">
            <thead>
              <tr>
                {columns}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? rows : this.props.noRowsRenderer()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
DataTable.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  data: React.PropTypes.array.isRequired,
  noRowsRenderer: React.PropTypes.func.isRequired
};
DataTable.defaultProps = {
  className: 'table'
};
