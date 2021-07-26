import { RootState } from '../../../rootReducer';
import Tag from './Tag';

export const getTags = (state: RootState): Tag[] => state.portfolio.tags.tags;
export const areLoading = (state: RootState): boolean => state.portfolio.tags.loading;
export const getSelectedId = (state: RootState): number => state.portfolio.tags.selectedId;
