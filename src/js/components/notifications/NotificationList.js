import React from 'react';
import ClassNames from 'classnames';

import Notification from './Notification';
import NotificationActions from '../../actions/NotificationActions';

export default class NotificationList extends React.Component {
  constructor() {
    super();
  }

  _removeNotification(index) {
    NotificationActions.removeNotification(index);
  }

  render() {
    let classes = ClassNames({
      'col-sm-12': true,
      'notifications-container': true,
      'collapsed': !this.props.active
    });

    let notifications = this.props.notifications.map((notification, index) => {
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
      <div className={classes}>
        {notifications.reverse()}
      </div>
    );
  }
}

NotificationList.propTypes = {
  active: React.PropTypes.bool,
  notifications: React.PropTypes.array
};
