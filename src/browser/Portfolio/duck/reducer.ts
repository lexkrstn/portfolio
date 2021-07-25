import {
  HASH_TAG_SELECTED,
  HASH_TAGS_RECEIVED,
  HASH_TAGS_REQUESTED,
  HASH_TAGS_REQUEST_FAILED,
  HashTagSelectedAction,
  HashTagsReceivedAction,
  PortfolioActionTypes,
  PortfolioState,
} from './types';

const defaultState: PortfolioState = {
  hashTags: null,
  hashTagsLoading: false,
  selectedHashTagId: 0,
  works: null,
  worksLoading: false,
};

export default function reducer(state = defaultState, action: PortfolioActionTypes): PortfolioState {
  switch (action.type) {
    case HASH_TAG_SELECTED:
      return {
        ...state,
        selectedHashTagId: (action as HashTagSelectedAction).payload,
      };
    case HASH_TAGS_REQUESTED:
      return {
        ...state,
        hashTagsLoading: true,
      };
    case HASH_TAGS_RECEIVED:
      return {
        ...state,
        hashTags: (action as HashTagsReceivedAction).payload,
        hashTagsLoading: false,
      };
    case HASH_TAGS_REQUEST_FAILED:
      return {
        ...state,
        hashTagsLoading: false,
      };
    default:
      return state;
  }
}
