import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

export const slice = createSlice({
  name: 'contactDialog',
  initialState,
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
});

export const { close, open } = slice.actions;
export default slice.reducer;
