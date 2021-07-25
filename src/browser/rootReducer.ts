import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import app from './App/duck/reducer';
import home from './Home/duck/reducer';
import portfolio from './Portfolio/duck/reducer';

const createRootReducer = (history: History) => combineReducers({
  app,
  home,
  portfolio,
  router: connectRouter(history),
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
