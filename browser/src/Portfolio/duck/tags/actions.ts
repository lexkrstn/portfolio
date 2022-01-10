import * as Types from './types';
import Tag from './Tag';

export interface TagSelectedAction {
  type: typeof Types.SELECTED,
  payload: number,
}

export interface TagsRequestedAction {
  type: typeof Types.REQUESTED;
}

export interface TagsReceivedAction {
  type: typeof Types.RECEIVED;
  payload: Tag[];
}

export interface TagsRequestFailedAction {
  type: typeof Types.REQUEST_FAILED;
  payload: {
    error: string;
    code: string;
  };
}

export type AllActions = (
  TagSelectedAction | TagsRequestedAction | TagsReceivedAction
  | TagsRequestFailedAction
);

export function select(id: number): TagSelectedAction {
  return {
    payload: id,
    type: Types.SELECTED,
  };
}

export function request(): TagsRequestedAction {
  return { type: Types.REQUESTED };
}

export function receive(hashTags: Tag[]): TagsReceivedAction {
  return {
    payload: hashTags,
    type: Types.RECEIVED,
  };
}

export function failRequest(error: string, code: string): TagsRequestFailedAction {
  return {
    payload: { code, error },
    type: Types.REQUEST_FAILED,
  };
}
