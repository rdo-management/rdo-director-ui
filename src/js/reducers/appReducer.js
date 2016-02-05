import { combineReducers } from 'redux';
import nodesReducer from './nodesReducer';
import loginReducer from './loginReducer';

const appReducer = combineReducers({
  login: loginReducer,
  nodes: nodesReducer
});

export default appReducer;
