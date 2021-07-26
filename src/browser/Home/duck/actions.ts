import * as types from './types';
import { WalkMode } from './WalkMode';

export interface WalkModeSetAction {
  type: typeof types.WALK_MODE_SET;
  payload: WalkMode;
}

export type AllActions = WalkModeSetAction;

export function setWalkMode(walkMode: WalkMode): WalkModeSetAction {
  return {
    payload: walkMode,
    type: types.WALK_MODE_SET,
  };
}
