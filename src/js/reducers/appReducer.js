import { combineReducers } from 'redux';
import environmentConfigurationReducer from './environmentConfigurationReducer';
import loginReducer from './loginReducer';
import nodesReducer from './nodesReducer';
import notificationsReducer from './notificationsReducer';
import plansReducer from './plansReducer';

const appReducer = combineReducers({
  environmentConfiguration: environmentConfigurationReducer,
  login: loginReducer,
  nodes: nodesReducer,
  notifications: notificationsReducer,
  plans: plansReducer
});

export default appReducer;
