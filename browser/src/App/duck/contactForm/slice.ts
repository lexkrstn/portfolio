import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  errorCode: '',
};

export interface SendContactFormPayload {
  email: string;
  message: string;
}

export interface FailSendContactFormPayload {
  code: string;
  message: string;
}

export type SendContactFormAction = PayloadAction<SendContactFormPayload>;
export type FailSendContactFormAction = PayloadAction<FailSendContactFormPayload>;
export type FulfillSendContactFormAction = PayloadAction<void>;

const slice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendContactForm(state, action: SendContactFormAction) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    failSendContactForm(state, action: FailSendContactFormAction) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    fulfillSendContactForm(state) {
      state.loading = false;
    },
  },
});

export const { sendContactForm, failSendContactForm, fulfillSendContactForm } = slice.actions;

export default slice.reducer;
