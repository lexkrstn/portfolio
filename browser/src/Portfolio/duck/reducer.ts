import { combineReducers } from 'redux';
import tags from './tags/reducer';
import work from './work/reducer';
import works from './works/reducer';

export default combineReducers({ tags, work, works });
