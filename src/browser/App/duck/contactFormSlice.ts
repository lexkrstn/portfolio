import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  errorCode: '',
};

export interface SendPayload {
  email: string;
  message: string;
}

export interface ErrorPayload {
  code: string;
  message: string;
}

export const slice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    send(state, action: PayloadAction<SendPayload>) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    sendingError(state, action: PayloadAction<ErrorPayload>) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    sendingSuccess(state) {
      state.loading = false;
    },
  },
});

export const { send, sendingError, sendingSuccess } = slice.actions;

export default slice.reducer;
