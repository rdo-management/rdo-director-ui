import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import DataTable from '../ui/tables/DataTable';
import { DataTableDataFieldCell,
         DataTableHeaderCell } from '../ui/tables/DataTableCells';
import DataTableColumn from '../ui/tables/DataTableColumn';

export default class NodesTable extends React.Component {
  constructor() {
    super();
    this.state = {
      filterString: '',
      sortBy: '',
      sortDir: 'asc'
    };
  }

  renderNoNodesFound() {
    return (
      <tr>
        <td colSpan="7">
          <p></p>
          <p className="text-center">There are no Nodes available</p>
        </td>
      </tr>
    );
  }

  onFilter(filterString) {
    this.setState({
      filterString: filterString
    });
  }

  _filterData(filterString, data) {
    let dataKeys = ['uuid'];
    return filterString ? data.filter((row) => {
      let result = dataKeys.filter((dataKey) => {
        return row[dataKey].toLowerCase().includes(filterString.toLowerCase());
      });
      return result.length > 0;
    }) : data;
  }

  render() {
    let filteredData = this._filterData(this.state.filterString, this.props.data).toJS();
    return (
      <DataTable {...this.props}
        data={this.props.data.toJS()} // TODO(jtomasek): remove this when DataTable is migrated to use ImmutableJS data. It will get passed as part of ...this.props
        rowsCount={filteredData.length}
        noRowsRenderer={this.renderNoNodesFound.bind(this)}
        onFilter={this.onFilter.bind(this)}
        filterString={this.state.filterString}>
        <DataTableColumn
          key="uuid"
          header={<DataTableHeaderCell key="uuid">UUID</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="uuid"/>}/>
        <DataTableColumn
          key="properties.cpu_arch"
          header={<DataTableHeaderCell key="properties.cpu_arch">CPU Arch.</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="properties.cpu_arch"/>}/>
        <DataTableColumn
          key="properties.cpus"
          header={<DataTableHeaderCell key="properties.cpus">CPU (cores)</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="properties.cpus"/>}/>
        <DataTableColumn
          key="properties.local_gb"
          header={<DataTableHeaderCell key="properties.local_gb">Disk (GB)</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="properties.local_gb"/>}/>
        <DataTableColumn
          key="properties.memory_mb"
          header={<DataTableHeaderCell key="properties.memory_mb">Memory (MB)</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="properties.memory_mb"/>}/>
        <DataTableColumn
          key="power_state"
          header={<DataTableHeaderCell key="power_state">Power State</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="power_state"/>}/>
        <DataTableColumn
          key="provision_state"
          header={<DataTableHeaderCell key="provision_state">Provision State</DataTableHeaderCell>}
          cell={<DataTableDataFieldCell data={filteredData} field="provision_state"/>}/>
      </DataTable>
    );
  }
}
NodesTable.propTypes = {
  data: ImmutablePropTypes.list.isRequired
};
