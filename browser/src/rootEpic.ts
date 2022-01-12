import { combineEpics } from 'redux-observable';
import about, { Action as AboutActions } from './About/duck/epic';
import app, { Action as AppAction } from './App/duck/epic';
import { AllActions as HomeActions } from './Home/duck/actions';
import { AllActions as PortfolioActions } from './Portfolio/duck/actions';
import portfolio from './Portfolio/duck/epic';

export type AllActions = AboutActions | AppAction | HomeActions | PortfolioActions;

export default combineEpics<AllActions>(
  about,
  app,
  portfolio,
);
