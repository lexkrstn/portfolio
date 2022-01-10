import * as Types from './types';
import Work from '../work/Work';

import { AllActions, WorkSelectedAction, WorksReceivedAction } from './actions';

const defaultState = {
  works: null as Work[],
  loading: false,
  selectedId: 0,
};

export type WorksState = typeof defaultState;

export default function worksReducer(
  state = defaultState,
  action: AllActions = undefined,
): WorksState {
  switch (action.type) {
    case Types.SELECTED:
      return {
        ...state,
        selectedId: (action as WorkSelectedAction).payload,
      };
    case Types.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.RECEIVED:
      return {
        ...state,
        works: (action as WorksReceivedAction).payload,
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
