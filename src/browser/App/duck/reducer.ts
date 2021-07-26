import { AllActions, InitialNowSetAction } from './actions';
import * as types from './types';

const defaultState = {
  initialNow: null as number,
};

export type AppState = typeof defaultState;

export default function reducer(state = defaultState, action: AllActions): AppState {
  switch (action.type) {
    case types.INITIAL_NOW_SET:
      return {
        ...state,
        initialNow: (action as InitialNowSetAction).payload,
      };
    default:
      return state;
  }
}
