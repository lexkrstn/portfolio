import { HomeActionTypes, HomeState, WALK_MODE_SET } from './types';

const defaultState: HomeState = {
  walkMode: 'scroll',
};

export default function reducer(state = defaultState, action: HomeActionTypes): HomeState {
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
