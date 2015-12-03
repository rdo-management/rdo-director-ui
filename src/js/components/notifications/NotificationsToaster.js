import * as _ from 'lodash';
import React from 'react';

import NotificationStore from '../../stores/NotificationStore';

import Notification from './Notification';

export default class NotificationsToaster extends React.Component {
  constructor() {
    super();
    this.state = {
      toasterNotification: null,
      timestamp: (new Date()).getTime(),
      queuedNotifications: [],
      isHovering: false,
      timeout: false
    };

    this.notificationsChangeListener = this._onNotificationsChange.bind(this);
  }

  componentDidMount() {
    NotificationStore.addChangeListener(this.notificationsChangeListener);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.toasterNotification) {
      if (nextState.toasterNotification != this.state.toasterNotification) {
        this.startTimer();
      }
    }

    if (this.state.isHovering && !nextState.isHovering && !this.state.timeout) {
      this.showNextNotification();
    }
  }

  componentWillUnmount() {
    NotificationStore.removeChangeListener(this.notificationsChangeListener);
    this.clearTimer();
  }

  _onNotificationsChange() {
    let now = new Date();
    let notifications = NotificationStore.getState();
    let timestamp = this.state.timestamp;
    let queuedNotifications = this.state.queuedNotifications.slice(0);

    // Determine which notifications are new
    let newNotifications = _.filter(notifications, function(notification) {
      return notification.timestamp > timestamp;
    });

    // If we are currently showing a notification push it back onto the queue
    if (this.state.toasterNotification) {
      queuedNotifications.push(this.state.toasterNotification);
    }

    if (newNotifications.length > 0) {
      // Add new notifications to the queue
      queuedNotifications = queuedNotifications.concat(newNotifications);
    }

    // Remove any queued notifications that were dismissed
    queuedNotifications = _.filter(queuedNotifications, function(queuedNotification) {
      return _.find(notifications, function(notification) {
        return notification.timestamp === queuedNotification.timestamp &&
               notification.type === queuedNotification.type &&
               notification.message === queuedNotification.message;
      });
    });

    // Sort the queued notifications
    queuedNotifications = _.sortBy(queuedNotifications, function(notification) {
      return notification.timestamp;
    });

    // Get the next toaster notification to show
    let toasterNotification = queuedNotifications.pop();

    // Update the state
    this.setState({
      queuedNotifications: queuedNotifications,
      toasterNotification: toasterNotification,
      timestamp: now.getTime()
    });
  }

  showNextNotification() {
    let queuedNotifications = this.state.queuedNotifications;
    let toasterNotification = queuedNotifications.pop();
    this.setState(
      {
        queuedNotifications: queuedNotifications,
        toasterNotification: toasterNotification
      }
    );
  }

  toasterTimeout() {
    this.setState({timeout: false});
    if (!this.state.isHovering) {
      this.showNextNotification();
    }
  }

  startTimer() {
    // Clear any previous timers
    this.clearTimer();

    this.setState({timeout: setTimeout(this.toasterTimeout.bind(this), 8000)});
  }

  clearTimer() {
    if (this.state.timeout)
    {
      clearTimeout(this.state.timeout);
      this.setState({timeout: false});
    }
  }

  closeNotification () {
    this.setState({isHovering: false});
    this.clearTimer();
    this.showNextNotification();
  }

  notificationHover (isHover) {
    this.setState({isHovering: isHover});
  }

  render() {
    let notification = false;
    if (this.state.toasterNotification) {
      notification = (
        <Notification
          title={this.state.toasterNotification.title}
          message={this.state.toasterNotification.message}
          type={this.state.toasterNotification.type}
          removeNotification={this.closeNotification.bind(this)}
          onMouseEnter={this.notificationHover.bind(this, true)}
          onMouseLeave={this.notificationHover.bind(this, false)}/>
      );
    }

    return (
      <div className='notification-toaster col-lg-5 col-md-6 col-sm-8 col-xs-12'>
        {notification}
      </div>
    );
  }
}
