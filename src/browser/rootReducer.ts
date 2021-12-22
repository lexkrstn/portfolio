import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import about from './About/duck/reducer';
import app from './App/duck/reducer';
import home from './Home/duck/reducer';
import portfolio from './Portfolio/duck/reducer';

const createRootReducer = (history: History) => combineReducers({
  about,
  app,
  home,
  portfolio,
  router: connectRouter(history),
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
