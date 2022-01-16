import { combineReducers } from 'redux';
import contactDialog from './contactDialog/slice';
import contactForm from './contactForm/slice';
import snackbar from './snackbar/slice';

export default combineReducers({
  contactDialog,
  contactForm,
  snackbar,
});
