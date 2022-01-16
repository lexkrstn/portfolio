import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../rootReducer';
import { Skill } from '../../interfaces';

export const selectSkills = (state: RootState): Skill[] => state.about.skills.skills;

export const selectSkillsFetched = (state: RootState): boolean => (
  !!state.about.skills.skills || state.about.skills.loading || !!state.about.skills.error
);

export const selectBasicSkills = createSelector(
  selectSkills,
  skills => skills ? skills.filter(s => s.group === 'basic') : [],
);

export const selectMiscSkills = createSelector(
  selectSkills,
  skills => skills ? skills.filter(s => s.group === 'misc') : [],
);

export const selectLangSkills = createSelector(
  selectSkills,
  skills => skills ? skills.filter(s => s.group === 'lang') : [],
);
