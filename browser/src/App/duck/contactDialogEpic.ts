import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { sendingSuccess } from './contactFormSlice';
import { open, close } from './contactDialogSlice';

export type Action = ReturnType<typeof open> | ReturnType<typeof close>;

const epic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  ofType(sendingSuccess.type),
  mapTo(close()),
);

export default epic;
