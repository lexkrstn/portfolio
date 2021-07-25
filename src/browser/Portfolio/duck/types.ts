export const HASH_TAGS_REQUESTED = 'portfolio/HASH_TAGS_REQUESTED';
export const HASH_TAGS_RECEIVED = 'portfolio/HASH_TAGS_RECEIVED';
export const HASH_TAGS_REQUEST_FAILED = 'portfolio/HASH_TAGS_REQUEST_FAILED';
export const HASH_TAG_SELECTED = 'portfolio/HASH_TAG_SELECTED';

export interface Work {
  name: string;
}

export interface HashTag {
  id: number;
  name: string;
}

export interface PortfolioState {
  hashTags: HashTag[];
  hashTagsLoading: boolean;
  selectedHashTagId: number;
  works: Work[];
  worksLoading: boolean;
}

export interface HashTagsRequestedAction {
  type: typeof HASH_TAGS_REQUESTED;
}

export interface HashTagsReceivedAction {
  type: typeof HASH_TAGS_RECEIVED;
  payload: HashTag[];
}

export interface HashTagsRequestFailedAction {
  type: typeof HASH_TAGS_REQUEST_FAILED;
  payload: {
    error: string;
    code: string;
  };
}

export interface HashTagSelectedAction {
  type: typeof HASH_TAG_SELECTED,
  payload: number,
}

export type PortfolioActionTypes = HashTagsRequestedAction | HashTagsReceivedAction |
  HashTagsRequestFailedAction | HashTagSelectedAction;
