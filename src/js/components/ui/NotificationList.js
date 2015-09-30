import React from 'react';

import Notification from './Notification';
import NotificationActions from '../../actions/NotificationActions';
import NotificationStore from '../../stores/NotificationStore';

export default class NotificationList extends React.Component {
  constructor() {
    super();
    this.state = { notifications: [] };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this._onChange();
    NotificationStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    NotificationStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ notifications: NotificationStore.getState() });
  }

  _removeNotification(index) {
    NotificationActions.removeNotification(index);
  }

  render() {
    let notifications = this.state.notifications.map((notification, index) => {
      return (
        <Notification key={index}
                      title={notification.title}
                      message={notification.message}
                      type={notification.type}
                      removeNotification={this._removeNotification.bind(this, index)}
                      dismissable={notification.dismissable}/>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-lg-offset-9 col-md-4
                          col-md-offset-8 col-sm-6 col-sm-offset-6">
            <div className="notification-list">
              {notifications}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
