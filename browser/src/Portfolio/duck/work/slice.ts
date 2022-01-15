import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Work } from '../../interfaces';

export type FetchWorkPayload = number;
export type FulfillFetchWorkPayload = Work;
export type FailFetchWorkPayload = {
  code: string;
  message: string;
};
export type FetchWorkAction = PayloadAction<FetchWorkPayload>;
export type FailFetchWorkAction = PayloadAction<FailFetchWorkPayload>;
export type FulfillFetchWorkAction = PayloadAction<FulfillFetchWorkPayload>;

const initialState = {
  work: null as Work,
  loading: false,
  error: '',
  errorCode: '',
};

const slice = createSlice({
  name: 'work',
  initialState,
  reducers: {
    fetchWork(state, action: FetchWorkAction) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    failFetchWork(state, action: FailFetchWorkAction) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    fulfillFetchWork(state, action: FulfillFetchWorkAction) {
      state.loading = false;
      state.work = action.payload;
    },
  },
});

export const { fetchWork, failFetchWork, fulfillFetchWork } = slice.actions;

export default slice.reducer;
