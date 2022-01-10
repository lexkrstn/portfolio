import * as Actions from './actions';
import * as Types from './types';
import Work from './Work';

const defaultState = {
  work: null as Work,
  loading: false,
};

export type WorkState = typeof defaultState;

export default function workReducer(
  state = defaultState,
  action: Actions.AllActions = undefined,
): WorkState {
  switch (action.type) {
    case Types.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.RECEIVED:
      return {
        ...state,
        work: (action as Actions.WorkReceivedAction).payload,
        loading: false,
      };
    case Types.REQUEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
