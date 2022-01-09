import { combineReducers } from 'redux';
import contactDialog from './contactDialogSlice';
import contactForm from './contactFormSlice';
import snackbar from './snackbarSlice';

export * as contactDialog from './contactDialogSlice';
export * as contactForm from './contactFormSlice';
export * as snackbar from './snackbarSlice';

export default combineReducers({
  contactDialog,
  contactForm,
  snackbar,
});
