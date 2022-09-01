import { combineEpics } from 'redux-observable';
import about, { Action as AboutActions } from './pages/About/duck/epic';
import app, { Action as AppAction } from './pages/_App/duck/epic';
import portfolio, { Action as PortfolioAction } from './pages/Portfolio/duck/epic';

export type AllActions = AboutActions | AppAction | PortfolioAction;

export default combineEpics<AllActions>(
  about,
  app,
  portfolio,
);
