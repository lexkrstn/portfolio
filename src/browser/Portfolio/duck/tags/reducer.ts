import * as Types from './types';
import Tag from './Tag';

import { AllActions, TagSelectedAction, TagsReceivedAction } from './actions';

const defaultState = {
  tags: null as Tag[],
  loading: false,
  selectedId: 0,
};

export type TagsState = typeof defaultState;

export default function tagsReducer(
  state = defaultState,
  action: AllActions,
): TagsState {
  switch (action.type) {
    case Types.SELECTED:
      return {
        ...state,
        selectedId: (action as TagSelectedAction).payload,
      };
    case Types.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.RECEIVED:
      return {
        ...state,
        tags: (action as TagsReceivedAction).payload,
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
