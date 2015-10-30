import React from 'react';
import invariant from 'invariant';

export default class DataTable extends React.Component {
  render() {
    let columns = [];
    React.Children.forEach(this.props.children, (child) => {
      if (child == null) {
        return;
      }
      invariant(
        child.type.name === 'DataTableColumn' ||
        child.type.name === 'DataTableColumnRowSelect',
        'DataTable child type should be <DataTableColumn /> or ' +
        '<DataTableColumnRowSelect />'
      );
      columns.push(child);
    });

    let rows = this.props.data.map((rowData, index) => {
      return (
        <DataTableRow key={index} columns={columns} rowData={rowData}/>
      );
    });

    return (
      <table {...this.props}>
        <thead>
          <tr>
            {columns}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
DataTable.propTypes = {
  children: React.PropTypes.array,
  data: React.PropTypes.array.isRequired
};
DataTable.defaultProps = {
  className: 'table'
};


class DataTableRow extends React.Component {
  render() {
    let cells = this.props.columns.map((column, index) => {
      let CellRenderer = column.props.cellRenderer;
      return (
        <CellRenderer key={index} dataKey={column.props.dataKey} rowData={this.props.rowData}/>
      );
    });

    return (
      <tr>
        {cells}
      </tr>
    );
  }
}
DataTableRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
  rowData: React.PropTypes.object.isRequired
};
