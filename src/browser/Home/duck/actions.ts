import { WALK_MODE_SET, WalkMode, WalkModeSetAction } from './types';

export function setWalkMode(walkMode: WalkMode): WalkModeSetAction {
  return {
    payload: walkMode,
    type: WALK_MODE_SET,
  };
}
