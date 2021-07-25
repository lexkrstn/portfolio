import { AppActionTypes, AppState, INITIAL_NOW_SET, InitialNowSetAction } from './types';

const defaultState: AppState = {
  initialNow: undefined,
};

export default function reducer(
  state = defaultState,
  action: AppActionTypes,
): AppState {
  switch (action.type) {
    case INITIAL_NOW_SET:
      return {
        ...state,
        initialNow: (action as InitialNowSetAction).payload,
      };
    default:
      return state;
  }
}
