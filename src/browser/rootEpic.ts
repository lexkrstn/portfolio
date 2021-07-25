import { combineEpics } from 'redux-observable';
import portfolio from './Portfolio/duck/epic';

export default combineEpics(
  portfolio,
);
