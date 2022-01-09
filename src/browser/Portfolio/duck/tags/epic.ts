import { Observable } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import * as actions from './actions';
import * as types from './types';

const requestedEpic = (
  action$: Observable<actions.AllActions>
): Observable<actions.AllActions> => action$.pipe(
  ofType(types.REQUESTED),
  delay(1000),
  mapTo(actions.receive([
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
  requestedEpic,
);
