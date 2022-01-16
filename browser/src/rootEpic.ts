import { combineEpics } from 'redux-observable';
import about, { Action as AboutActions } from './About/duck/epic';
import app, { Action as AppAction } from './App/duck/epic';
import portfolio, { Action as PortfolioAction } from './Portfolio/duck/epic';

export type AllActions = AboutActions | AppAction | PortfolioAction;

export default combineEpics<AllActions>(
  about,
  app,
  portfolio,
);
