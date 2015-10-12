import React from 'react';

export class DataTableCell extends React.Component {
  getCellData() {
    return this.props.rowData[this.props.dataKey];
  }
  render() {
    let cellData = this.getCellData();
    return (
      <td>{cellData}</td>
    );
  }
}
DataTableCell.propTypes = {
  dataKey: React.PropTypes.string.isRequired,
  rowData: React.PropTypes.object.isRequired
};

export class DataTableCellLink extends DataTableCell {
  render() {
    let cellData = this.getCellData();
    return (
      <td><a href="#">{cellData}</a></td>
    );
  }
}
