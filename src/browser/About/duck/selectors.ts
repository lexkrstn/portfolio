import { RootState } from '../../rootReducer';
import ISkill from './ISkill';

export const getSkills = (state: RootState): ISkill[] => state.about.skills;
export const haveRequestedSkills = (state: RootState): boolean =>
  !!state.about.skills || state.about.loading;
