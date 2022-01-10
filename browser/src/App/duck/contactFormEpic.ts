import { combineEpics, ofType } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { switchMap, map, filter, mapTo } from 'rxjs/operators';
import { ErrorRecord, post } from '../../utils/api';
import { send, sendingError, sendingSuccess } from './contactFormSlice';
import { show } from './snackbarSlice';

type SendAction = ReturnType<typeof send>;
type SendingSuccessAction = ReturnType<typeof sendingSuccess>;
type SendingErrorAction = ReturnType<typeof sendingError>;
type ShowSnackbarAction = ReturnType<typeof show>;

export type Action = SendAction | SendingSuccessAction | SendingErrorAction | ShowSnackbarAction;

interface ServerPayload {
  email: string;
  message: string;
}

const sendEpic = (
  action$: Observable<Action>
): Observable<Action> => action$.pipe(
  filter((action: SendAction) => action.type === send.type),
  map(action => action.payload),
  switchMap((payload: ServerPayload) => {
    const promise = post('contact', payload)
      .then(() => sendingSuccess())
      .catch((err: ErrorRecord) => sendingError(err));
    return from(promise);
  }),
);

const sendingSuccessEpic = (
  action$: Observable<Action>
): Observable<Action> => action$.pipe(
  ofType(sendingSuccess.type),
  mapTo(show({ message: 'Your email has been sent!', severity: 'success' })),
);

const sendingErrorEpic = (
  action$: Observable<Action>
): Observable<Action> => action$.pipe(
  filter((action: SendingErrorAction) => action.type === sendingError.type),
  map(action => action.payload),
  map(({ message }) => show({ message, severity: 'error' })),
);

export default combineEpics(sendEpic, sendingSuccessEpic, sendingErrorEpic);
