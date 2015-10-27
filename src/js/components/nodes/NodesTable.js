import React from 'react';

import DataTable from '../ui/tables/DataTable';
import { DataTableCellLink } from '../ui/tables/DataTableCells';
import { DataTableColumn, SortableDataTableColumn } from '../ui/tables/DataTableColumns';

export default class NodesTable extends React.Component {
  renderNoNodesFound() {
    return (
      <tr>
        <td colSpan="4">
          <p></p>
          <p className="text-center">There are no Nodes available</p>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <DataTable {...this.props} noRowsRenderer={this.renderNoNodesFound.bind(this)}>
        <SortableDataTableColumn dataKey="uuid"
                                 key="uuid"
                                 label="UUID"
                                 cellRenderer={DataTableCellLink}
                                 filterable/>
        <DataTableColumn dataKey="instance_uuid"
                         key="instance_uuid"
                         label="Instance UUID"/>
        <SortableDataTableColumn dataKey="power_state"
                         key="power_state"
                         label="Power State"
                         filterable/>
        <DataTableColumn dataKey="provision_state"
                         key="provision_state"
                         label="State"/>
      </DataTable>
    );
  }
}
