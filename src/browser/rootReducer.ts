import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import app from './App/duck/reducer';

const createRootReducer = (history: History) => combineReducers({
  app,
  router: connectRouter(history),
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
