import { combineEpics } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { ErrorRecord, get } from '../../../../utils/api';
import { Work } from '../../../../entities';
import {
  fetchWork, fulfillFetchWork, failFetchWork,
  FetchWorkAction, FailFetchWorkAction, FulfillFetchWorkAction,
} from './slice';

export type Action = FetchWorkAction | FailFetchWorkAction | FulfillFetchWorkAction;

const fetchWorkEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: FetchWorkAction) => action.type === fetchWork.type),
  map(action => action.payload),
  switchMap((id: string) => {
    const promise = get(`works/${id}`)
      .then((works: Work) => fulfillFetchWork(works))
      .catch((err: ErrorRecord) => failFetchWork(err));
    return from(promise);
  }),
);

export default combineEpics(
  fetchWorkEpic,
);
