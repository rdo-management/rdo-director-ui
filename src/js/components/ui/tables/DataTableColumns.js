import * as _ from 'lodash';
import React from 'react';

import { DataTableCell } from './DataTableCells';

export class DataTableColumn extends React.Component {
  render() {
    return (
      <th>{this.props.title || _.startCase(this.props.dataKey)}</th>
    );
  }
}
DataTableColumn.propTypes = {
  cellRenderer: React.PropTypes.any,
  dataKey: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
};
DataTableColumn.defaultProps = {
  cellRenderer: DataTableCell
};
