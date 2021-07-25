import { RootState } from '../../rootReducer';
import { HashTag } from './types';

export const getHashTags = (state: RootState): HashTag[] => state.portfolio.hashTags;
export const areHashTagsLoading = (state: RootState): boolean => state.portfolio.hashTagsLoading;
export const getSelectedHashTagId = (state: RootState): number => state.portfolio.selectedHashTagId;
