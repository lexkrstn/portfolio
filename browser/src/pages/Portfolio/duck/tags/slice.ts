import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '../../../../entities';

export type FetchTagsPayload = never;
export type FulfillFetchTagsPayload = Tag[];
export type FailFetchTagsPayload = {
  code: string;
  message: string;
};
export type SetTagSelectedPayload = string;

export type FetchTagsAction = PayloadAction<FetchTagsPayload>;
export type FulfillFetchTagsAction = PayloadAction<FulfillFetchTagsPayload>;
export type FailFetchTagsAction = PayloadAction<FailFetchTagsPayload>;
export type SetTagSelectedAction = PayloadAction<SetTagSelectedPayload>;

const initialState = {
  tags: null as Tag[],
  loading: false,
  error: '',
  errorCode: '',
  selectedId: '',
};

const slice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    fetchTags(state) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    failFetchTags(state, action: FailFetchTagsAction) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    fulfillFetchTags(state, action: FulfillFetchTagsAction) {
      state.loading = false;
      state.tags = action.payload;
    },
    setTagSelected(state, action: SetTagSelectedAction) {
      state.selectedId = action.payload;
    },
  },
});

export const {
  fetchTags, failFetchTags, fulfillFetchTags, setTagSelected,
} = slice.actions;

export default slice.reducer;
