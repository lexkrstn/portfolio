import * as Types from './types';
import Work from './Work';

export interface WorkRequestedAction {
  type: typeof Types.REQUESTED;
  payload: { id: number };
}

export interface WorkReceivedAction {
  type: typeof Types.RECEIVED;
  payload: Work;
}

export interface WorkRequestFailedAction {
  type: typeof Types.REQUEST_FAILED;
  payload: {
    error: string;
    code: string;
  };
}

export type AllActions = WorkRequestedAction | WorkReceivedAction | WorkRequestFailedAction;

export function request(id: number): WorkRequestedAction {
  return {
    payload: { id },
    type: Types.REQUESTED,
  };
}

export function receive(work: Work): WorkReceivedAction {
  return {
    payload: work,
    type: Types.RECEIVED,
  };
}

export function failRequest(error: string, code: string): WorkRequestFailedAction {
  return {
    payload: { code, error },
    type: Types.REQUEST_FAILED,
  };
}
