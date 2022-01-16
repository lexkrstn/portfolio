import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../rootReducer';
import { Tag } from '../../interfaces';

export const selectTags = (state: RootState): Tag[] => state.portfolio.tags.tags;
export const selectSelectedTagId = (state: RootState): number => state.portfolio.tags.selectedId;
export const selectTagsLoading = (state: RootState): boolean => state.portfolio.tags.loading;

export const selectSelectedTag = createSelector(
  selectSelectedTagId,
  selectTags,
  (tagId, tags) => tagId && tags ? tags.find(tag => tag.id === tagId) : null,
);
