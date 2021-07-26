import { combineReducers } from 'redux';
import tagsReducer from './tags/reducer';
import worksReducer from './works/reducer';

export default combineReducers({
  tags: tagsReducer,
  works: worksReducer,
});
