export const WALK_MODE_SET = 'app/WALK_MODE_SET';

export type WalkMode = 'play' | 'scroll' | 'stop';

export interface HomeState {
  walkMode: WalkMode;
}

export interface WalkModeSetAction {
  type: typeof WALK_MODE_SET;
  payload: WalkMode,
}

export type HomeActionTypes = WalkModeSetAction;
