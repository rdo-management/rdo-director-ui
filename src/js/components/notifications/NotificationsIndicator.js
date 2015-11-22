import * as _ from 'lodash';
import React from 'react';
import ClassNames from 'classnames';

export default class NotificationsIndicator extends React.Component {

  greaterStatus (status1, status2) {
    if (status1 === 'error' || status2 === 'error') {
      return 'error';
    }
    else if (status1 === 'warning' || status2 === 'warning') {
      return 'warning';
    }
    else if (status1 === 'info' || status2 === 'info') {
      return 'error';
    }
    else if (status1 === 'success' || status1 === 'ok' ||
             status2 === 'success' || status2 === 'ok') {
      return 'success';
    }
    else {
      return 'error';
    }
  }

  render() {
    let currentStatus = 'ok';
    let statusCount;
    let me = this;

    this.props.notifications.forEach(function(notification) {
      currentStatus = me.greaterStatus(currentStatus, notification.type || 'error');
    });

    statusCount = _.filter(this.props.notifications, function(notification) {
      let status = notification.type;
      if (status === currentStatus) {
        return true;
      }
      else if ((currentStatus === 'error') && !status) {
        return true;
      }
      else if ((currentStatus === 'success') && (status === 'ok')) {
        return true;
      }
      else {
        return false;
      }
    }).length;


    let StatusIcon = ClassNames({
      'validations-icon' : true,
      'pficon': true,
      'pficon-error-circle-o':     currentStatus === 'error',
      'pficon-warning-triangle-o': currentStatus === 'warning',
      'pficon-ok':                 currentStatus === 'success' || currentStatus === 'ok',
      'pficon-info':               currentStatus === 'info'
    });


    return (
      <a onClick={this.props.onClick}>
        <span className={StatusIcon}></span>
        <span> Notifications: {statusCount}</span>
      </a>
    );
  }
}
NotificationsIndicator.propTypes = {
  notifications: React.PropTypes.array,
  onClick: React.PropTypes.func
};
