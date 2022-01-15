import { combineReducers } from 'redux';
import tags from './tags/slice';
import work from './work/slice';
import works from './works/slice';

export * from './tags/slice';
export * from './tags/selectors';
export * from './work/slice';
export * from './work/selectors';
export * from './works/slice';
export * from './works/selectors';

export default combineReducers({
  tags,
  work,
  works,
});
