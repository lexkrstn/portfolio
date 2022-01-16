import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skill } from '../../interfaces';

const initialState = {
  skills: null as Skill[],
  loading: false,
  error: '',
  errorCode: '',
};

export type RequestPayload = never;

export type RequestSuccessPayload = Skill[];

export type RequestErrorPayload = {
  code: string;
  message: string;
};

export const slice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    requestError(state, action: PayloadAction<RequestErrorPayload>) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    requestSuccess(state, action: PayloadAction<RequestSuccessPayload>) {
      state.loading = false;
      state.skills = action.payload;
    },
  },
});

export const { request, requestError, requestSuccess } = slice.actions;

export default slice.reducer;
