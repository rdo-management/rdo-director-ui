import * as _ from 'lodash';
import React from 'react';

export default class ValidationsIndicator extends React.Component {

  getStatusInfo() {
    let allValidations = [];
    _.forEach(this.props.validationStages, function (validationStage) {
      allValidations = allValidations.concat(validationStage.validations);
    });

    let stateCounts = _.countBy(_.pluck(allValidations, 'status'));
    stateCounts.total = allValidations.length;
    stateCounts.error = (stateCounts.error || 0) + (stateCounts.failed || 0);
    stateCounts.available = (stateCounts.available || 0) + (stateCounts.new || 0);
    stateCounts.running = stateCounts.running || 0;

    return stateCounts;
  }

  getStatusBadge (statusInfo) {
    if (statusInfo.error > 0 || statusInfo.available > 0) {
      let badgeClasses = 'badge';
      let statusText = '';
      let statusCount = 0;

      if (statusInfo.error > 0) {
        badgeClasses += ' error';
        statusText = 'Errors';
        statusCount = statusInfo.error;
      }
      else {
        badgeClasses += ' available';
        statusText = 'Available';
        statusCount = statusInfo.available;
      }
      return (
        <div className="pull-right">
          <span className="indicator-category">{statusText}</span>
          <span className={badgeClasses}>{statusCount}</span>
        </div>
      );
    }
    else {
      return false;
    }
  }

  render() {
    let statusInfo = this.getStatusInfo();

    return (
      <a onClick={this.props.onClick} className="indicator">
        <span className="indicator-title">Validations:</span>
        <span className="indicator-category">Running</span>
        <span className="badge running">{statusInfo.running}</span>
        {this.getStatusBadge(statusInfo)}
      </a>
    );
  }
}
ValidationsIndicator.propTypes = {
  onClick: React.PropTypes.func,
  validationStages: React.PropTypes.array
};

