import { combineEpics, ofType } from 'redux-observable';
import { from, Observable } from 'rxjs';
import {
  switchMap, map, filter, mapTo,
} from 'rxjs/operators';
import { ErrorRecord, post } from '../../../../utils/api';
import {
  sendContactForm, failSendContactForm, fulfillSendContactForm,
  SendContactFormAction, FailSendContactFormAction, FulfillSendContactFormAction,
} from './slice';
import { showSnackbar, ShowSnackbarAction } from '../snackbar/slice';

export type Action = (
  SendContactFormAction | FailSendContactFormAction |
  FulfillSendContactFormAction | ShowSnackbarAction
);

interface ServerPayload {
  email: string;
  message: string;
}

const sendEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: SendContactFormAction) => action.type === sendContactForm.type),
  map(action => action.payload),
  switchMap((payload: ServerPayload) => {
    const promise = post('contact', payload)
      .then(() => fulfillSendContactForm())
      .catch((err: ErrorRecord) => failSendContactForm(err));
    return from(promise);
  }),
);

const sendingSuccessEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  ofType(fulfillSendContactForm.type),
  mapTo(showSnackbar({ message: 'Your email has been sent!', severity: 'success' })),
);

const sendingErrorEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: FailSendContactFormAction) => action.type === failSendContactForm.type),
  map(action => action.payload),
  map(({ message }) => showSnackbar({ message, severity: 'error' })),
);

export default combineEpics(sendEpic, sendingSuccessEpic, sendingErrorEpic);
