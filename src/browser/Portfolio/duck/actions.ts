import {
  HASH_TAG_SELECTED,
  HASH_TAGS_RECEIVED,
  HASH_TAGS_REQUESTED,
  HASH_TAGS_REQUEST_FAILED,
  HashTag,
  HashTagSelectedAction,
  HashTagsReceivedAction,
  HashTagsRequestedAction,
  HashTagsRequestFailedAction,
} from './types';

export function selectHashTag(id: number): HashTagSelectedAction {
  return {
    payload: id,
    type: HASH_TAG_SELECTED,
  };
}

export function requestHashTags(): HashTagsRequestedAction {
  return { type: HASH_TAGS_REQUESTED };
}

export function receiveHashTags(hashTags: HashTag[]): HashTagsReceivedAction {
  return {
    payload: hashTags,
    type: HASH_TAGS_RECEIVED,
  };
}

export function failHashTagsRequest(error: string, code: string): HashTagsRequestFailedAction {
  return {
    payload: { code, error },
    type: HASH_TAGS_REQUEST_FAILED,
  };
}
