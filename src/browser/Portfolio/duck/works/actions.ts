import * as Types from './types';
import Work from './Work';

export interface WorkSelectedAction {
  type: typeof Types.SELECTED,
  payload: number,
}

export interface WorksRequestedAction {
  type: typeof Types.REQUESTED;
}

export interface WorksReceivedAction {
  type: typeof Types.RECEIVED;
  payload: Work[];
}

export interface WorksRequestFailedAction {
  type: typeof Types.REQUEST_FAILED;
  payload: {
    error: string;
    code: string;
  };
}

export type AllActions = WorkSelectedAction | WorksRequestedAction |
  WorksReceivedAction | WorksRequestFailedAction;

export function select(id: number): WorkSelectedAction {
  return {
    payload: id,
    type: Types.SELECTED,
  };
}

export function request(): WorksRequestedAction {
  return { type: Types.REQUESTED };
}

export function receive(hashWorks: Work[]): WorksReceivedAction {
  return {
    payload: hashWorks,
    type: Types.RECEIVED,
  };
}

export function failRequest(error: string, code: string): WorksRequestFailedAction {
  return {
    payload: { code, error },
    type: Types.REQUEST_FAILED,
  };
}
