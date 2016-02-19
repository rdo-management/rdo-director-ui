import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import appReducer from './reducers/appReducer';

const loggerMiddleware = createLogger();

const store = createStore(
  appReducer,
  {},
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

export default store;
