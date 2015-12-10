import React from 'react';
import ClassNames from 'classnames';

import NotificationListItem from './NotificationListItem';
import NotificationActions from '../../actions/NotificationActions';

export default class NotificationList extends React.Component {
  constructor () {
    super();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.active && !nextProps.active)
    {
      NotificationActions.notificationViewed(this.props.notifications);
    }
  }

  _removeNotification (index) {
    NotificationActions.removeNotification(index);
  }

  render () {
    let classes = ClassNames({
      'col-sm-12': true,
      'notifications-container': true,
      'collapsed': !this.props.active
    });

    let notificationComponents = this.props.notifications.map((notification, index) => {
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

    let getNotificationsContent = function (notifications) {
      if (notifications && notifications.length > 0)
      {
        return (
          <div>
            {notificationComponents.reverse()}
          </div>
        );
      }
      else
      {
        return (
          <div className="blank-slate-pf">
            <div className="blank-slate-pf-icon">
              <span className="pficon pficon-flag"></span>
            </div>
            <h1>No Notifications</h1>
            <p>There are no notifications at this time.</p>
          </div>
        );
      }
    };

    return (
      <div className={classes}>
        {getNotificationsContent(this.props.notifications)}
      </div>
    );
  }
}

NotificationList.propTypes = {
  active: React.PropTypes.bool,
  notifications: React.PropTypes.array
};
