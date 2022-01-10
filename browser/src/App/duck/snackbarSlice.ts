import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Severity = 'error' | 'warning' | 'info' | 'success';

type SnackbarPayload = {
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

export const slice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show(state, action: PayloadAction<SnackbarPayload>) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'success';
      state.duration = action.payload.duration || 6000;
    },
    close(state) {
      state.open = false;
    },
  },
});

export const { close, show } = slice.actions;
export default slice.reducer;
