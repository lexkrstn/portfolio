import { combineEpics } from 'redux-observable';
import tagsEpic from './tags/epic';
import workEpic from './work/epic';
import worksEpic from './works/epic';

export default combineEpics(tagsEpic, workEpic, worksEpic);
