import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WalkMode = 'play' | 'scroll';

const initialState = {
  walkMode: 'scroll' as WalkMode,
};

export type SetWalkModePayload = WalkMode;
export type SetWalkModeAction = PayloadAction<SetWalkModePayload>;

const slice = createSlice({
  name: 'contactDialog',
  initialState,
  reducers: {
    setWalkMode(state, action: SetWalkModeAction) {
      state.walkMode = action.payload;
    },
  },
});

export const { setWalkMode } = slice.actions;
export default slice.reducer;
