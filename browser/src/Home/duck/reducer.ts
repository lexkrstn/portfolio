import { AllActions } from './actions';
import { WALK_MODE_SET } from './types';
import { WalkMode } from './WalkMode';

const defaultState = {
  walkMode: 'scroll' as WalkMode,
};

export type HomeState = typeof defaultState;

export default function reducer(state = defaultState, action: AllActions): HomeState {
  switch (action.type) {
    case WALK_MODE_SET:
      return {
        ...state,
        walkMode: action.payload,
      };
    default:
      return state;
  }
}
