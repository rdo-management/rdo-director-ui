import React from 'react';
import ClassNames from 'classnames';

import Validation from './Validation';

export default class ValidationType extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  getStatusInfo() {
    let statusInfo = {
      validationStatuses: [],
      showDetails: false
    };
    let availableCount = 0;
    let runningCount = 0;
    let sucessCount = 0;
    let errorCount = 0;

    this.props.validationType.validations.forEach(function(validation, index) {
      if (validation.status === 'failed') {
        errorCount++;
      }
      else if (validation.status === 'ok') {
        sucessCount++;
      }
      else if (validation.status === 'running') {
        runningCount++;
      }
      else if (validation.status === 'new') {
        availableCount++;
      }

      if (validation.details && validation.details.length > 0)
      {
        statusInfo.showDetails = true;
      }
    });

    if (availableCount > 0) {
      statusInfo.validationStatuses.push(
        {
          count: availableCount,
          label: 'Available' + (runningCount||sucessCount||errorCount ? ',':'')
        }
      );
    }
    if (runningCount > 0) {
      statusInfo.validationStatuses.push(
        {
          count: runningCount,
          label: 'Running' + (sucessCount||errorCount ? ',':'')
        }
      );
    }
    if (sucessCount > 0) {
      statusInfo.validationStatuses.push(
        {
          count: sucessCount,
          label: 'Succeeded' + (errorCount ? ',':'')
        }
      );
    }
    if (errorCount > 0) {
      statusInfo.validationStatuses.push(
        {
          count: errorCount,
          label: 'Failed'
        }
      );
    }

    return statusInfo;
  }

  toggleOpen () {
    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  runAll () {
    // TODO: Run the validations
  }

  render() {
    // TODO: Get this information from the store rather than computing every time
    let statusInfo = this.getStatusInfo();

    let titleClass = ClassNames({
      'validation-type-title': true,
      'collapsed': !this.state.isOpen
    });

    let contentClass = ClassNames({
      'panel-body' : true,
      'validation-type-content' : true,
      'opened' : this.state.isOpen
    });

    let runButtonClass = ClassNames({
      'btn': true,
      'btn-primary' : true,
      'btn-xs': true
    });

    let validationStatuses = statusInfo.validationStatuses.map((status, index) => {
      return (
        <li key={index} className="validation-status">{status.count} {status.label}</li>
      );
    });

    let validations = this.props.validationType.validations.map((validation, index) => {
      return (
        <Validation key={index} validation={validation} />
      );
    });

    var detailsLink;
    if (statusInfo.showDetails)
    {
      detailsLink = (
        <a className="details-link">View Details</a>
      );
    }

    return (
      <div className="panel panel-default validation-type-panel">
        <div className="panel-heading validation-type-heading">
          <div className="row">
            <div className="col-lg-3 col-sm-3">
              <a onClick={this.toggleOpen.bind(this)} className={titleClass}>
                {this.props.validationType.name}
              </a>
            </div>
            <div className="col-lg-4 col-sm-5">
              <ul className="validation-statuses">
                {validationStatuses}
              </ul>
              {detailsLink}
            </div>
            <button className={runButtonClass} onClick={this.runAll.bind(this)}>
              Run All
            </button>
          </div>
        </div>
        <div className={contentClass}>
          <div className="container-fluid">
            <div className="row">
              {validations}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ValidationType.propTypes = {
  validationType: React.PropTypes.object
};
