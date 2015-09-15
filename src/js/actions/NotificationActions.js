import AppDispatcher from '../dispatchers/AppDispatcher.js';
import NotificationConstants from '../constants/NotificationConstants';

export default {
  notify(notification) {
    AppDispatcher.dispatch({
      actionType: NotificationConstants.NOTIFY,
      notification: notification
    });
  },

  removeNotification(notification) {
    AppDispatcher.dispatch({
      actionType: NotificationConstants.REMOVE_NOTIFICATION,
      notification: notification
    });
  }
};
