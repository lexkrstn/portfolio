import { RootState } from '../../rootReducer';
import Skill from './Skill';

export const getSkills = (state: RootState): Skill[] => state.about.skills;
export const haveRequestedSkills = (state: RootState): boolean => (
  !!state.about.skills || state.about.loading
);
