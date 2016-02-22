import { combineReducers } from 'redux';
import environmentConfigurationReducer from './environmentConfigurationReducer';
import loginReducer from './loginReducer';
import nodesReducer from './nodesReducer';
import notificationsReducer from './notificationsReducer';
import plansReducer from './plansReducer';
import validationsReducer from './validationsReducer';

const appReducer = combineReducers({
  environmentConfiguration: environmentConfigurationReducer,
  login: loginReducer,
  nodes: nodesReducer,
  notifications: notificationsReducer,
  plans: plansReducer,
  validations: validationsReducer
});

export default appReducer;
