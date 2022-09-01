import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Severity = 'error' | 'warning' | 'info' | 'success';

type ShowSnackbarPayload = {
  message: string;
  severity?: Severity;
  duration?: number;
};

const initialState = {
  open: false,
  message: '',
  severity: 'info' as Severity,
  duration: 6000,
};

export type ShowSnackbarAction = PayloadAction<ShowSnackbarPayload>;
export type CloseSnackbarAction = PayloadAction<void>;

const slice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action: ShowSnackbarAction) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'success';
      state.duration = action.payload.duration || 6000;
    },
    closeSnackbar(state) {
      state.open = false;
    },
  },
});

export const { closeSnackbar, showSnackbar } = slice.actions;
export default slice.reducer;
