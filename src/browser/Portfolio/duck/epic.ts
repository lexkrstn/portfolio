import { from, Observable } from 'rxjs';
import { switchMap, delay, mapTo } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import CONFIG from '../../config';
import { checkFetchResponseStatus } from '../../utils';
import { PortfolioActions as Actions, PortfolioTypes as Types } from './index';

const hashTagsRequestedEpic = (
  action$: Observable<Types.PortfolioActionTypes>
): Observable<Types.PortfolioActionTypes> => action$.pipe(
  ofType(Types.HASH_TAGS_REQUESTED),
  // switchMap((): Observable<Types.PortfolioActionTypes> => {
  //   const promise = fetch(`${CONFIG.apiUrl}/hash-tags`, {
  //       headers: { 'Accept': 'application/json' },
  //     })
  //     .then(checkFetchResponseStatus)
  //     .then(Actions.receiveHashTags)
  //     .catch(error => Actions.failHashTagsRequest(
  //       error.message || 'Connection error',
  //       error.сode,
  //     ));
  //   return from(promise);
  // }),
  delay(1000),
  mapTo(Actions.receiveHashTags([
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'NodeJS' },
    { id: 4, name: 'ExpressJS' },
    { id: 5, name: 'React' },
    { id: 6, name: 'Styled Components' },
    { id: 7, name: 'Redux' },
    { id: 8, name: 'Vue' },
    { id: 9, name: 'Vuex' },
    { id: 10, name: 'PHP' },
    { id: 11, name: 'Wordpress' },
    { id: 12, name: 'WooCommerce' },
    { id: 13, name: 'Git' },
    { id: 14, name: 'Sass/Less' },
    { id: 15, name: 'MySQL' },
    { id: 16, name: 'jQuery' },
    { id: 17, name: 'Bootstrap' },
    { id: 18, name: 'GraphQL' },
    { id: 19, name: 'REST' },
    { id: 20, name: 'Knex.js' },
    { id: 21, name: 'Objection.js' },
    { id: 22, name: 'From scratch' },
    { id: 23, name: 'Chai' },
  ])),
);

export default combineEpics(
  hashTagsRequestedEpic,
);
