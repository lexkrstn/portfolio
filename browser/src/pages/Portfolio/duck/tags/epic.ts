import { combineEpics } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ErrorRecord, get } from '../../../../utils/api';
import { Tag } from '../../../../entities';
import {
  fetchTags, failFetchTags, fulfillFetchTags,
  FetchTagsAction, FailFetchTagsAction, FulfillFetchTagsAction,
} from './slice';

export type Action = FetchTagsAction | FulfillFetchTagsAction | FailFetchTagsAction;

const fetchTagsEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: FetchTagsAction) => action.type === fetchTags.type),
  switchMap(() => {
    const promise = get('tags')
      .then((tags: Tag[]) => fulfillFetchTags(tags))
      .catch((err: ErrorRecord) => failFetchTags(err));
    return from(promise);
  }),
);

export default combineEpics(
  fetchTagsEpic,
);
