import React from 'react';

import NotificationActions from '../../actions/NotificationActions';

import Notification from './Notification';

export default class NotificationsToaster extends React.Component {
  constructor() {
    super();
    this.isHovering = false;
  }

  startTimer() {
    var me = this;

    // Clear any previous timers
    this.clearTimer();

    this.timeout = setTimeout(function () {
      if (!me.isHovering) {
        NotificationActions.notificationViewed(me.props.notification);
        me.timeout = undefined;
      }
    }, 8000);
  }

  clearTimer() {
    if (this.timeout)
    {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  closeNotification () {
    this.isHovering = false;
    NotificationActions.notificationViewed(this.props.notification);
    this.clearTimer();
  }

  notificationHover (isHover) {
    this.isHovering = isHover;
    if (!isHover) {
      if (!this.timeout) {
        NotificationActions.notificationViewed(this.props.notification);
      }
    }
  }

  render() {
    if (this.props.notification) {
      if (this.props.notification != this.lastNotification) {
        this.startTimer();
      }
    }
    else {
      this.clearTimer();
    }

    this.lastNotification = this.props.notification;

    let notification = false;
    if (this.props.notification) {
      notification = (
        <Notification
          title={this.props.notification.title}
          message={this.props.notification.message}
          type={this.props.notification.type}
          removeNotification={this.closeNotification.bind(this)}
          dismissable={true}
          mouseOver={this.notificationHover.bind(this, true)}
          mouseOut={this.notificationHover.bind(this, false)}/>
      );
    }
    return (
      <div className={this.props.className +
                      ' notification-toaster col-lg-5 col-md-6 col-sm-8 col-xs-12'}>
        {notification}
      </div>
    );
  }
}
NotificationsToaster.propTypes = {
  className: React.PropTypes.string,
  notification: React.PropTypes.object
};
