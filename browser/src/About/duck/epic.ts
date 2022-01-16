import { combineEpics } from 'redux-observable';
import skillsEpic, { Action as SkillsAction } from './skills/epic';

export type Action = SkillsAction;

export default combineEpics<Action>(skillsEpic);
