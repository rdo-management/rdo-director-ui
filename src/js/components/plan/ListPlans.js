import { Link } from 'react-router';
import React from 'react';

import DataTable from '../ui/tables/DataTable';
import { DataTableCell, DataTableHeaderCell } from '../ui/tables/DataTableCells';
import DataTableColumn from '../ui/tables/DataTableColumn';
import { PageHeader } from '../ui/PageHeader';
import PlansActions from '../../actions/PlansActions';
import PlansStore from '../../stores/PlansStore';

export default class ListPlans extends React.Component {
  constructor() {
    super();
    this.state = {
      plans: PlansStore.getPlans()
    };
    this.changeListener = this._onPlansChange.bind(this);
  }

  componentWillMount() {
    PlansActions.listPlans();
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onPlansChange() {
    this.setState({ plans: PlansStore.getPlans() });
  }

  renderNoPlans() {
    return (
      <tr>
        <td colSpan="2">
          <p></p>
          <p className="text-center">
            There are currently no Plans
          </p>
          <p className="text-center">
            <Link to="/plans/new"
                  query={{tab: 'newPlan'}}
                  className="btn btn-success">Create New Plan</Link>
          </p>
        </td>
      </tr>
    );
  }

  renderTableActions() {
    return (
      <Link to="/plans/new"
            query={{tab: 'newPlan'}}
            className="btn btn-primary">
        <span className="fa fa-plus"/> Create New Plan
      </Link>
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Plans</PageHeader>
        <DataTable data={this.state.plans}
                   rowsCount={this.state.plans.length}
                   noRowsRenderer={this.renderNoPlans.bind(this)}
                   tableActions={this.renderTableActions}>
          <DataTableColumn header={<DataTableHeaderCell key="name">Name</DataTableHeaderCell>}
                           cell={<PlanNameCell data={this.state.plans}/>}/>

          <DataTableColumn header={<DataTableHeaderCell key="actions">Actions</DataTableHeaderCell>}
                           cell={<RowActionsCell className="actions text-right"
                                                 data={this.state.plans}/>}/>
        </DataTable>
        {this.props.children}
      </div>
    );
  }
}
ListPlans.propTypes = {
  children: React.PropTypes.node
};

class RowActionsCell extends React.Component {
  render() {
    let plan = this.props.data[this.props.rowIndex];

    if(plan.transition) {
      // TODO(jtomasek): this causes DOMNesting validation error which should eventually go away
      // in future React versions. See https://github.com/facebook/react/issues/5506
      return null;
    } else {
      return (
        <DataTableCell {...this.props}>
          <Link key="edit"
                to={`/plans/${plan.name}/edit`}
                className="btn btn-xs btn-default">Edit</Link>
          &nbsp;
          <Link key="delete"
                to={`/plans/${plan.name}/delete`}
                className="btn btn-xs btn-danger">Delete</Link>
        </DataTableCell>
      );
    }
  }
}
RowActionsCell.propTypes = {
  data: React.PropTypes.array.isRequired,
  rowIndex: React.PropTypes.number
};

export class PlanNameCell extends React.Component {
  onPlanClick(e) {
    e.preventDefault();
    PlansActions.choosePlan(e.target.textContent);
  }

  getActiveIcon(planName) {
    if(planName === PlansStore.getCurrentPlanName()) {
      return (
        <span className="pficon pficon-flag"></span>
      );
    }
    return false;
  }

  render() {
    let plan = this.props.data[this.props.rowIndex];

    if(plan.transition) {
      return (
        <DataTableCell {...this.props} colSpan="2" className={plan.transition}>
          <em>Deleting <strong>{plan.name}</strong>&hellip;</em>
        </DataTableCell>
      );
    } else {
      return (
        <DataTableCell {...this.props}>
          {this.getActiveIcon(plan.name)} <a href="" onClick={this.onPlanClick}>{plan.name}</a>
        </DataTableCell>
      );
    }
  }
}
PlanNameCell.propTypes = {
  data: React.PropTypes.array.isRequired,
  rowIndex: React.PropTypes.number
};
