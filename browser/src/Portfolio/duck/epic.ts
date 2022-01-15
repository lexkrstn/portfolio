import { combineEpics } from 'redux-observable';
import tagsEpic, { Action as TagsAction } from './tags/epic';
import workEpic, { Action as WorkAction } from './work/epic';
import worksEpic, { Action as WorksAction } from './works/epic';

export type Action = TagsAction | WorkAction | WorksAction;

export default combineEpics<Action>(tagsEpic, workEpic, worksEpic);
