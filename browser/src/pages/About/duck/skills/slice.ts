import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Skill } from '../../../../entities';

export type FulfillFetchSkillsPayload = Skill[];
export type FailFetchSkillsPayload = {
  code: string;
  message: string;
};

export type FetchSkillsAction = PayloadAction<void>;
export type FailFetchSkillsAction = PayloadAction<FailFetchSkillsPayload>;
export type FulfillFetchSkillsAction = PayloadAction<FulfillFetchSkillsPayload>;

const slice = createSlice({
  name: 'skills',
  initialState: {
    skills: null as Skill[],
    loading: false,
    error: '',
    errorCode: '',
  },
  reducers: {
    fetchSkills(state) {
      state.loading = true;
      state.error = '';
      state.errorCode = '';
    },
    failFetchSkills(state, action: FailFetchSkillsAction) {
      state.loading = false;
      state.error = action.payload.message;
      state.errorCode = action.payload.code;
    },
    fulfillFetchSkills(state, action: FulfillFetchSkillsAction) {
      state.loading = false;
      state.skills = action.payload;
    },
  },
});

export const { fetchSkills, failFetchSkills, fulfillFetchSkills } = slice.actions;

export default slice.reducer;
