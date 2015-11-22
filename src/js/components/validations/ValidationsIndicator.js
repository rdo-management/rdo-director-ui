import React from 'react';
import ClassNames from 'classnames';


export default class ValidationsIndicator extends React.Component {

  greaterStatus (status1, status2) {
    if (status1 === 'failed' || status2 === 'failed') {
      return 'failed';
    }
    else if (status1 === 'running' || status2 === 'running') {
      return 'running';
    }
    else if (status1 === 'new' || status2 === 'new'){
      return 'available';
    }
    else if (status1 === 'ok' || status2 === 'ok'){
      return 'ok';
    }
    else {
      return 'unknown';
    }
  }

  render() {
    let currentStatus = 'success';
    let statusCount = 0;
    let me = this;

    this.props.validationTypes.forEach(function(validationType, i) {
      validationType.validations.forEach(function (validation, j) {
        if (i + j === 0)
        {
          currentStatus = validation.status || 'failed';
          statusCount = 1;
        }
        else if (validation.status === currentStatus) {
          statusCount++;
        }
        else
        {
          var newStatus = me.greaterStatus(currentStatus, validation.status || 'failed');
          if (newStatus !== currentStatus)
          {
            currentStatus = newStatus;
            statusCount = 1;
          }
        }
      });
    });

    let validationStatusIcon = ClassNames({
      'validations-icon' : true,
      'pficon pficon-error-circle-o':     currentStatus === 'failed',
      'pficon pficon-running':            currentStatus === 'running',
      'pficon pficon-add-circle-o':       currentStatus === 'new',
      'pficon pficon-ok':                 currentStatus === 'ok',
      'pficon pficon-warning-triangle-o': currentStatus === 'unknown'
    });


    return (
      <a onClick={this.props.onClick}>
        <span className={validationStatusIcon}></span>
        <span> Validations: {statusCount}</span>
      </a>
    );
  }
}
ValidationsIndicator.propTypes = {
  onClick: React.PropTypes.func,
  validationTypes: React.PropTypes.array
};

