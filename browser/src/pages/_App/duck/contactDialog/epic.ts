import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { fulfillSendContactForm } from '../contactForm/slice';
import { closeContactDialog, OpenContactDialogAction, CloseContactDialogAction } from './slice';

export type Action = OpenContactDialogAction | CloseContactDialogAction;

const epic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  ofType(fulfillSendContactForm.type),
  mapTo(closeContactDialog()),
);

export default epic;
