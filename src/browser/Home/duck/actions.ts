import { WALK_MODE_SET, WalkModeSetAction, WalkMode } from './types';

export function setWalkMode(walkMode: WalkMode): WalkModeSetAction {
  return {
    payload: walkMode,
    type: WALK_MODE_SET,
  };
}
