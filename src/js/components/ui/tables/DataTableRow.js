import React from 'react';

export default class DataTableRow extends React.Component {
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
