import { combineEpics } from 'redux-observable';
import contactFormEpic, { Action as ContactFormAction } from './contactForm/epic';
import contactDialogEpic, { Action as ContactDialogAction } from './contactDialog/epic';

export default combineEpics(
  contactFormEpic,
  contactDialogEpic,
);

export type Action = ContactFormAction | ContactDialogAction;
