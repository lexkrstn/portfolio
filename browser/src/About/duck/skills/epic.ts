import { combineEpics } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ErrorRecord, get } from '../../../utils/api';
import { Skill } from '../../interfaces';
import {
  fetchSkills, failFetchSkills, fulfillFetchSkills,
  FetchSkillsAction, FailFetchSkillsAction, FulfillFetchSkillsAction,
} from './slice';

export type Action = FetchSkillsAction | FailFetchSkillsAction | FulfillFetchSkillsAction;

const requestEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: FetchSkillsAction) => action.type === fetchSkills.type),
  switchMap(() => {
    const promise = get('skills')
      .then((skills: Skill[]) => fulfillFetchSkills(skills))
      .catch((err: ErrorRecord) => failFetchSkills(err));
    return from(promise);
  }),
);

export default combineEpics(
  requestEpic,
);
