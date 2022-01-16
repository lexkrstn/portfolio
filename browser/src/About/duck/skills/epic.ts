import { combineEpics } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ErrorRecord, get } from '../../../utils/api';
import { Skill } from '../../interfaces';
import { request, requestError, requestSuccess } from './slice';

type RequestAction = ReturnType<typeof request>;
type RequestSuccessAction = ReturnType<typeof requestSuccess>;
type RequestErrorAction = ReturnType<typeof requestError>;

export type Action = RequestAction | RequestSuccessAction | RequestErrorAction;

const requestEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: RequestAction) => action.type === request.type),
  switchMap(() => {
    const promise = get('skills')
      .then((skills: Skill[]) => requestSuccess(skills))
      .catch((err: ErrorRecord) => requestError(err));
    return from(promise);
  }),
);

export default combineEpics(
  requestEpic,
);
