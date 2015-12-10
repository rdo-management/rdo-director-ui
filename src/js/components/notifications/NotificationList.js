import React from 'react';
import ClassNames from 'classnames';

import BlankSlate from '../ui/BlankSlate';
import NotificationListItem from './NotificationListItem';
import NotificationActions from '../../actions/NotificationActions';

export default class NotificationList extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.active && !nextProps.active)
    {
      NotificationActions.notificationViewed(this.props.notifications);
    }
  }

  _removeNotification (index) {
    NotificationActions.removeNotification(index);
  }

  getNotificationsContent  (notifications) {
    let notificationListItems = notifications.map((notification, index) => {
      return (
        <NotificationListItem key={index}
                              title={notification.title}
                              message={notification.message}
                              type={notification.type}
                              timestamp={notification.timestamp}
                              viewed={notification.viewed}
                              removeNotification={this._removeNotification.bind(this, index)}/>
      );
    });

    if (notifications && notifications.length > 0) {
      return (
        <div>
          {notificationListItems.reverse()}
        </div>
      );
    }
    else {
      return (
        <BlankSlate iconClass="fa fa-bullhorn"
                    title="No Notifications"
                    message="There are no notifications at this time." />
      );
    }
  }

  render () {
    let classes = ClassNames({
      'col-sm-12': true,
      'notifications-container': true,
      'collapsed': !this.props.active
    });

    return (
      <div className={classes}>
        {this.getNotificationsContent(this.props.notifications)}
      </div>
    );
  }
}

NotificationList.propTypes = {
  active: React.PropTypes.bool,
  notifications: React.PropTypes.array
};
