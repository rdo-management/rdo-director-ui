import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import nodesReducer from './nodesReducer';
import plansReducer from './plansReducer';

const appReducer = combineReducers({
  login: loginReducer,
  nodes: nodesReducer,
  plans: plansReducer
});

export default appReducer;
