import { combineEpics } from 'redux-observable';
import about from './About/duck/epic';
import { AllActions as AboutActions } from './About/duck/actions';
import { AllActions as AppActions } from './App/duck/actions';
import { AllActions as HomeActions } from './Home/duck/actions';
import { AllActions as PortfolioActions } from './Portfolio/duck/actions';
import portfolio from './Portfolio/duck/epic';

export type AllActions = AboutActions | AppActions | HomeActions | PortfolioActions;

export default combineEpics<AllActions>(
  about,
  portfolio,
);
