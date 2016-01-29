import { combineReducers } from 'redux';
import nodesReducer from './nodesReducer';

const appReducer = combineReducers({
  nodes: nodesReducer
});

export default appReducer;
