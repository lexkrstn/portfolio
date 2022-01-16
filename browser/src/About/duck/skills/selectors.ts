import { RootState } from '../../../rootReducer';
import { Skill } from '../../interfaces';

export const getSkills = (state: RootState): Skill[] => state.about.skills.skills;
export const haveRequestedSkills = (state: RootState): boolean => (
  !!state.about.skills.skills || state.about.skills.loading || !!state.about.skills.error
);
