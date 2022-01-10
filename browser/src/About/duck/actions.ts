import * as Types from './types';
import Skill from './Skill';

export interface SkillsRequestedAction {
  type: typeof Types.REQUESTED;
}

export interface SkillsReceivedAction {
  type: typeof Types.RECEIVED;
  payload: Skill[];
}

export interface SkillsRequestFailedAction {
  type: typeof Types.REQUEST_FAILED;
  payload: {
    error: string;
    code: string;
  };
}

export type AllActions = SkillsRequestedAction | SkillsReceivedAction | SkillsRequestFailedAction;

export function request(): SkillsRequestedAction {
  return { type: Types.REQUESTED };
}

export function receive(skills: Skill[]): SkillsReceivedAction {
  return {
    payload: skills,
    type: Types.RECEIVED,
  };
}

export function failRequest(error: string, code: string): SkillsRequestFailedAction {
  return {
    payload: { code, error },
    type: Types.REQUEST_FAILED,
  };
}
