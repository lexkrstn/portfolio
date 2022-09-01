import { combineReducers } from 'redux';
import tags from './tags/slice';
import work from './work/slice';
import works from './works/slice';

export default combineReducers({
  tags,
  work,
  works,
});
