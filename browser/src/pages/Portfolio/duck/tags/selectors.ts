import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../rootReducer';

export const selectTags = (state: RootState) => state.portfolio.tags.tags;
export const selectSelectedTagId = (state: RootState) => state.portfolio.tags.selectedId;
export const selectTagsLoading = (state: RootState) => state.portfolio.tags.loading;

export const selectSortedTags = createSelector(
  selectTags,
  tags => tags ? tags.slice().sort((a, b) => a.name.localeCompare(b.name)) : null,
);

export const selectSelectedTag = createSelector(
  selectSelectedTagId,
  selectTags,
  (tagId, tags) => tagId && tags ? tags.find(tag => tag._id === tagId) : null,
);
