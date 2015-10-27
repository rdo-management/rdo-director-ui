import ClassNames from 'classnames';
import React from 'react';

import { DataTableCell } from './DataTableCells';

export class DataTableColumn extends React.Component {
  render() {
    return (
      <th>{this.props.label}</th>
    );
  }
}
DataTableColumn.propTypes = {
  cellRenderer: React.PropTypes.any,
  dataKey: React.PropTypes.string.isRequired,
  filterable: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired
};
DataTableColumn.defaultProps = {
  cellRenderer: DataTableCell
};

export class SortableDataTableColumn extends DataTableColumn {
  _onSort(e) {
    e.preventDefault();
    let sortDir;
    if (this.props.dataKey === this.props.sortBy) {
      sortDir = this.props.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortDir = this.props.defaultSortDir;
    }
    // let sortDir = this.props.dataKey === this.props.sortBy && this.props.sortDir === 'asc' ? 'desc' : 'asc';
    this.props.onSort(this.props.dataKey, sortDir);
  }
  render() {
    let classes = ClassNames({
      sorting: this.props.dataKey !== this.props.sortBy,
      sorting_asc: this.props.dataKey === this.props.sortBy && this.props.sortDir === 'asc',
      sorting_desc: this.props.dataKey === this.props.sortBy && this.props.sortDir === 'desc'
    });
    return (
      <th className={classes} onClick={this._onSort.bind(this)}>{this.props.label}</th>
    );
  }
}
SortableDataTableColumn.propTypes = {
  cellRenderer: React.PropTypes.any,
  dataKey: React.PropTypes.string.isRequired,
  defaultSortDir: React.PropTypes.oneOf(['asc', 'desc']).isRequired,
  filterable: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  onSort: React.PropTypes.func,
  sortBy: React.PropTypes.string,
  sortDir: React.PropTypes.oneOf(['asc', 'desc'])
};
SortableDataTableColumn.defaultProps = {
  cellRenderer: DataTableCell,
  defaultSortDir: 'asc'
};
