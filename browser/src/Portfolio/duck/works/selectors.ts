import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../rootReducer';
import { Work } from '../../interfaces';
import { selectSelectedTagId } from '../tags/selectors';

export const selectWorks = (state: RootState): Work[] => state.portfolio.works.works;
export const selectWorksLoading = (state: RootState): boolean => state.portfolio.works.loading;
export const selectSelectedWorkId = (state: RootState): number => state.portfolio.works.selectedId;

export const selectTaggedWorks = createSelector(
  selectSelectedTagId,
  selectWorks,
  (tagId, works) => tagId && works ? works.filter(w => w.tagIds.includes(tagId)) : works,
);
