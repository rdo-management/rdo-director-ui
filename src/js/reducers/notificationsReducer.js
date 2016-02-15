import { Map } from 'immutable';

import NotificationConstants from '../constants/NotificationConstants';

const initialState = Map({
  all: Map()
});

export default function notificationsReducer(state = initialState, action) {
  switch(action.type) {

  case NotificationConstants.NOTIFY:
    const notification = action.payload;
    return state.update('all', all => all.set(notification.id, notification));

  case NotificationConstants.REMOVE_NOTIFICATION:
    return state.update('all', all => all.delete(action.payload));

  case NotificationConstants.NOTIFICATIONS_VIEWED:
    return state.update('all', all => all.map(notification => notification.set('viewed', true)));

  default:
    return state;

  }
}
