import * as _ from 'lodash';
import React from 'react';

import NotificationStore from '../../stores/NotificationStore';

import NotificationToast from './NotificationToast';

export default class NotificationsToaster extends React.Component {
  constructor() {
    super();
    this.state = {
      toasterNotification: null,
      nextNotification: null,
      timestamp: (new Date()).getTime(),
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

    // Determine which notifications are new
    let newNotifications = _.filter(notifications, function(notification) {
      return notification.timestamp > timestamp;
    });

    if (newNotifications.length > 0) {
      newNotifications = _.sortBy(newNotifications, function(notification) {
        return notification.timestamp;
      });

      let nextNotification = newNotifications.pop();

      if (!this.state.toasterNotification || !this.state.isHovering) {
        this.setState({toasterNotification: nextNotification, timestamp: now.getTime()});
      }
      else {
        this.setState({nextNotification: nextNotification, timestamp: now.getTime()});
      }
    }
  }

  showNextNotification() {
    this.setState(
      {
        toasterNotification: this.state.nextNotification,
        nextNotification: null
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
        <NotificationToast
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
