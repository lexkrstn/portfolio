import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import about from './pages/About/duck/reducer';
import app from './pages/_App/duck/reducer';
import home from './pages/Home/duck/reducer';
import portfolio from './pages/Portfolio/duck/reducer';

const createRootReducer = (history: History) => combineReducers({
  about,
  app,
  home,
  portfolio,
  router: connectRouter(history),
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
