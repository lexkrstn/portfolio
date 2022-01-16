import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Work } from '../../interfaces';

export type FetchWorksPayload = void;
export type FulfillFetchWorksPayload = Work[];
export type FailFetchWorksPayload = {
  code: string;
  message: string;
};
export type SetWorkSelectedPayload = string;

export type FetchWorksAction = PayloadAction<FetchWorksPayload>;
export type FulfillFetchWorksAction = PayloadAction<FulfillFetchWorksPayload>;
export type FailFetchWorksAction = PayloadAction<FailFetchWorksPayload>;
export type SetWorkSelectedAction = PayloadAction<SetWorkSelectedPayload>;

const initialState = {
  works: null as Work[],
  loading: false,
  error: '',
  errorCode: '',
  selectedId: '',
};

const slice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    fetchWorks(state) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    failFetchWorks(state, action: FailFetchWorksAction) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    fulfillFetchWorks(state, action: FulfillFetchWorksAction) {
      state.loading = false;
      state.works = action.payload;
    },
    setWorkSelected(state, action: SetWorkSelectedAction) {
      state.selectedId = action.payload;
    },
  },
});

export const {
  fetchWorks, failFetchWorks, fulfillFetchWorks, setWorkSelected,
} = slice.actions;

export default slice.reducer;
