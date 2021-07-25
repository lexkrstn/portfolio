export const INITIAL_NOW_SET = 'app/INITIAL_NOW_SET';

export interface AppState {
  initialNow: number;
}

export interface InitialNowSetAction {
  type: typeof INITIAL_NOW_SET;
  payload: number;
}
export type AppActionTypes = InitialNowSetAction;
