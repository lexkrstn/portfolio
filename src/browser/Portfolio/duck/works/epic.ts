import { from, Observable } from 'rxjs';
import { switchMap, delay, mapTo } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import CONFIG from '../../../config';
import { checkFetchResponseStatus } from '../../../utils';
import { AllActions } from '../actions';
import { receive } from './actions';
import * as types from './types';

const requestedEpic = (
  action$: Observable<AllActions>
): Observable<AllActions> => action$.pipe(
  ofType(types.REQUESTED),
  // switchMap((): Observable<Types.PortfolioActionTypes> => {
  //   const promise = fetch(`${CONFIG.apiUrl}/works`, {
  //       headers: { 'Accept': 'application/json' },
  //     })
  //     .then(checkFetchResponseStatus)
  //     .then(receive)
  //     .catch(error => failRequest(
  //       error.message || 'Connection error',
  //       error.сode,
  //     ));
  //   return from(promise);
  // }),
  delay(1000),
  mapTo(receive([
    { id: 1, name: 'Work 1', tagIds: [1, 2] },
    { id: 2, name: 'Work 2', tagIds: [2, 3] },
  ])),
);

export default combineEpics(
  requestedEpic,
);
