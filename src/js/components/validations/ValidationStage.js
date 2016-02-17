import ImmutablePropTypes from 'react-immutable-proptypes';
import ClassNames from 'classnames';
import React from 'react';

import Validation from './Validation';
import { ValidationsStatusCounts } from '../../immutableRecords/validations';


export default class ValidationStage extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  toggleOpen(e) {
    e.preventDefault();
    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  runStage(e) {
    e.preventDefault(),
    this.props.runValidationStage(this.props.uuid);
  }

  getStatusBadge(title, badgeStyle, count) {
    if (count > 0) {
      return (
        <div className="status-container">
          <span className="badge-title">{title}</span>
          <span className={'badge ' + badgeStyle}>{count}</span>
        </div>
      );
    }
    return false;
  }

  getStatusBadges() {
    const statusCounts = new ValidationsStatusCounts(
      this.props.validations.countBy(validation => validation.status));
    return (
      <div>
        {this.getStatusBadge('Running', 'running',   statusCounts.running)}
        {this.getStatusBadge('New',     'available', statusCounts.new)}
        {this.getStatusBadge('Success', 'success',   statusCounts.success)}
        {this.getStatusBadge('Errors',  'error',     statusCounts.error)}
        {this.getStatusBadge('Failed',  'error',     statusCounts.failed)}
      </div>
    );
  }

  render() {
    let titleClass = ClassNames({
      link: true,
      collapsed: !this.state.isOpen
    });

    let contentClass = ClassNames({
      'panel-collapse collapse' : true,
      'in' : this.state.isOpen
    });

    let validations = this.props.validations.map(validation => {
      return (
        <Validation key={validation.uuid}
                    name={validation.name}
                    status={validation.status}
                    runValidation={this.props.runValidation}
                    stopValidation={this.props.stopValidation}
                    description={validation.description}
                    uuid={validation.uuid} />
      );
    });

    return (
      <div className="panel panel-default">
        <div className="panel-heading validation-stage-panel-heading container-fluid">
          <div className="row">
            <div className="col-md-2 col-xs-3">
              <h4 className="panel-title">
                <a onClick={this.toggleOpen.bind(this)} className={titleClass}>
                  {this.props.name}
                </a>
              </h4>
            </div>
            <div className="col-md-9 col-sm-8 col-xs-7">
              {this.getStatusBadges()}
            </div>
            <div className="col-sm-1 col-xs-2">
              <button className="btn btn-primary pull-right" onClick={this.runStage.bind(this)}>
                Run All
              </button>
            </div>
          </div>
        </div>
        <div className={contentClass}>
          <div className="container-fluid">
            <div className="row validations-container">
              {validations}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ValidationStage.propTypes = {
  name: React.PropTypes.string.isRequired,
  runValidation: React.PropTypes.func.isRequired,
  runValidationStage: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  stopValidation: React.PropTypes.func.isRequired,
  uuid: React.PropTypes.string.isRequired,
  validations: ImmutablePropTypes.list.isRequired
};
