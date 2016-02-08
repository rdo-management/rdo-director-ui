import { combineReducers } from 'redux';
import nodesReducer from './nodesReducer';
import plansReducer from './plansReducer';

const appReducer = combineReducers({
  nodes: nodesReducer,
  plans: plansReducer
});

export default appReducer;
