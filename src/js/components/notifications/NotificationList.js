import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ClassNames from 'classnames';

import BlankSlate from '../ui/BlankSlate';
import NotificationListItem from './NotificationListItem';

export default class NotificationList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.active && !nextProps.active) {
      this.props.notificationsViewed();
    }
  }

  getNotificationsContent(notifications) {
    let notificationListItems = notifications.toList().map(notification => {
      return (
        <NotificationListItem
          key={notification.id}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          timestamp={notification.timestamp}
          viewed={notification.viewed}
          removeNotification={this.props.removeNotification.bind(this, notification.id)}/>
      );
    });

    if (notifications && notifications.size > 0) {
      return (
        <table className="table table-striped table-hover">
          <tbody>
            {notificationListItems.reverse()}
          </tbody>
        </table>
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
  notifications: ImmutablePropTypes.map.isRequired,
  notificationsViewed: React.PropTypes.func.isRequired,
  removeNotification: React.PropTypes.func.isRequired
};
