import { combineEpics } from 'redux-observable';
import tagsEpic from './tags/epic';
import worksEpic from './works/epic';

export default combineEpics(tagsEpic, worksEpic);
