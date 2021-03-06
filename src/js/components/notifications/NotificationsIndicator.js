import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

export default class NotificationsIndicator extends React.Component {

  getStatusInfo() {
    // Generate an object of status counts {'status': statusCount...}
    let stateCounts = this.props.notifications.countBy(n => n.type);

    let unreadCount = this.props.notifications.countBy(notification => {
      return notification.viewed ? 'read' : 'unread';
    }).get('unread') || 0;

    return {
      total: this.props.notifications.size,
      unread: unreadCount,
      error: (stateCounts.error || 0) + (stateCounts.undefined || 0),
      warning: stateCounts.warning || 0
    };
  }

  getStatusBadge (statusInfo) {
    if (statusInfo.error > 0 || statusInfo.warning > 0) {
      let badgeClasses = 'badge';
      let statusText = '';
      let statusCount = 0;

      if (statusInfo.error > 0) {
        badgeClasses += ' error';
        statusText = 'Errors';
        statusCount = statusInfo.error;
      }
      else {
        badgeClasses += ' warning';
        statusText = 'Warnings';
        statusCount = statusInfo.warning;
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
        <span className="indicator-title">Notifications:</span>
        <span className="indicator-category">Unread</span>
        <span className="badge unread">{statusInfo.unread}</span>
        {this.getStatusBadge(statusInfo)}
      </a>
    );
  }
}
NotificationsIndicator.propTypes = {
  notifications: ImmutablePropTypes.map.isRequired,
  onClick: React.PropTypes.func
};
