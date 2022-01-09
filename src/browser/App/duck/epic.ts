import { combineEpics } from 'redux-observable';
import contactFormEpic, { Action as ContactFormAction } from './contactFormEpic';
import contactDialogEpic, { Action as ContactDialogAction } from './contactDialogEpic';

export default combineEpics(
  contactFormEpic,
  contactDialogEpic,
);

export type Action = ContactFormAction | ContactDialogAction;
