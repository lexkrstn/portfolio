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
    {
      id: 1,
      name: 'Work 1',
      tagIds: [1, 2, 3],
      images: [{
        full: 'https://caferati.me/images/portfolio/perverte/list.jpg',
        thumbnail: 'https://caferati.me/images/portfolio/perverte/list.jpg',
      }],
    },
    {
      id: 2,
      name: 'Work 2',
      tagIds: [4, 1, 2],
      images: [{
        full: 'https://caferati.me/images/portfolio/sky-go-desktop/1.jpg',
        thumbnail: 'https://caferati.me/images/portfolio/sky-go-desktop/1.jpg',
      }],
    },
    {
      id: 3,
      name: 'Work 3',
      tagIds: [2, 3],
      images: [{
        full: 'https://caferati.me/images/portfolio/sky-go-desktop/2.jpg',
        thumbnail: 'https://caferati.me/images/portfolio/sky-go-desktop/2.jpg',
      }],
    },
    {
      id: 4,
      name: 'Work 4',
      tagIds: [4, 1],
      images: [{
        full: 'https://caferati.me/images/portfolio/sky-go-desktop/3.jpg',
        thumbnail: 'https://caferati.me/images/portfolio/sky-go-desktop/3.jpg',
      }],
    },
    {
      id: 5,
      name: 'Work 5',
      tagIds: [3, 4, 5],
      images: [{
        full: 'https://caferati.me/images/portfolio/whygowild/5.jpg',
        thumbnail: 'https://caferati.me/images/portfolio/whygowild/5.jpg',
      }],
    },
    {
      id: 6,
      name: 'Work 6',
      tagIds: [2, 3],
      images: [{
        full: 'https://caferati.me/images/portfolio/whygowild/6.jpg',
        thumbnail: 'https://caferati.me/images/portfolio/whygowild/6.jpg',
      }],
    },
  ])),
);

export default combineEpics(
  requestedEpic,
);
