import { combineReducers } from 'redux';
import skills from './skillsSlice';

export * as skills from './skillsSlice';

export default combineReducers({
  skills,
});
