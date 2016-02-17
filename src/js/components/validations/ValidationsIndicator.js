import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

export default class ValidationsIndicator extends React.Component {
  getStatusBadge(statusCounts) {
    if (statusCounts.error > 0 || statusCounts.failed > 0 || statusCounts.new > 0) {
      let badgeClasses, statusText, statusCount;

      if (statusCounts.error > 0) {
        badgeClasses = 'badge error';
        statusText = 'Errors';
        statusCount = statusCounts.error;
      } else if (statusCounts.failed > 0) {
        badgeClasses = 'badge error';
        statusText = 'Failed';
        statusCount = statusCounts.failed;
      } else {
        badgeClasses = 'badge available';
        statusText = 'Available';
        statusCount = statusCounts.new;
      }

      return (
        <div className="pull-right">
          <span className="indicator-category">{statusText}</span>
          <span className={badgeClasses}>{statusCount}</span>
        </div>
      );
    } else {
      return false;
    }
  }

  render() {
    const statusCounts = this.props.validationsStatusCounts;
    return (
      <a onClick={this.props.onClick} className="indicator">
        <span className="indicator-title">Validations:</span>
        <span className="indicator-category">Running</span>
        <span className="badge running">{statusCounts.running}</span>
        {this.getStatusBadge(statusCounts)}
      </a>
    );
  }
}
ValidationsIndicator.propTypes = {
  onClick: React.PropTypes.func,
  validationStages: ImmutablePropTypes.map.isRequired,
  validationsStatusCounts: ImmutablePropTypes.record.isRequired
};
