import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

export type OpenContactDialogAction = PayloadAction<void>;
export type CloseContactDialogAction = PayloadAction<void>;

const slice = createSlice({
  name: 'contactDialog',
  initialState,
  reducers: {
    openContactDialog(state) {
      state.open = true;
    },
    closeContactDialog(state) {
      state.open = false;
    },
  },
});

export const { openContactDialog, closeContactDialog } = slice.actions;
export default slice.reducer;
