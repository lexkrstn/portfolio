import { combineEpics } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ErrorRecord, get } from '../../../utils/api';
import { Work } from '../../interfaces';
import {
  fetchWorks, fulfillFetchWorks, failFetchWorks,
  FetchWorksAction, FailFetchWorksAction, FulfillFetchWorksAction,
} from './slice';

export type Action = FetchWorksAction | FailFetchWorksAction | FulfillFetchWorksAction;

const fetchWorksEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: FetchWorksAction) => action.type === fetchWorks.type),
  switchMap(() => {
    const promise = get('works')
      .then((works: Work[]) => fulfillFetchWorks(works))
      .catch((err: ErrorRecord) => failFetchWorks(err));
    return from(promise);
  }),
);

export default combineEpics(
  fetchWorksEpic,
);
