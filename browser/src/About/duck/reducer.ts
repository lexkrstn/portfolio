import * as Types from './types';
import Skill from './Skill';

import { AllActions, SkillsReceivedAction } from './actions';

const defaultState = {
  skills: null as Skill[],
  loading: false,
};

export type SkillsState = typeof defaultState;

export default function skillsReducer(
  state = defaultState,
  action: AllActions = undefined,
): SkillsState {
  switch (action.type) {
    case Types.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case Types.RECEIVED:
      return {
        ...state,
        skills: (action as SkillsReceivedAction).payload,
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
