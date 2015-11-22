import BaseStore from './BaseStore';
import NotificationConstants from '../constants/NotificationConstants';

class NotificationStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this.state = [];
  }

  _registerToActions(payload) {
    switch(payload.actionType) {
    case NotificationConstants.NOTIFY:
      this.onNotify(payload.notification);
      break;
    case NotificationConstants.REMOVE_NOTIFICATION:
      this.onRemoveNotification(payload.notification);
      break;
    case NotificationConstants.NOTIFICATION_VIEWED:
      this.onViewedNotification(payload.notification);
      break;
    default:
      break;
    }
  }

  onNotify(notificationData) {
    let notification = {
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type,
      viewed: false,
      dismissable: notificationData.dissmissable
    };
    this.state.push(notification);
    this.emitChange();
  }

  onRemoveNotification(index) {
    this.state.splice(index, 1);
    this.emitChange();
  }

  onViewedNotification(notification) {
    notification.viewed = true;
    this.emitChange();
  }

  getState() {
    return this.state;
  }
}

export default new NotificationStore();
