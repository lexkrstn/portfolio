import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../rootReducer';
import { selectSelectedTagId, selectTags } from '../tags/selectors';

export const selectWorks = (state: RootState) => state.portfolio.works.works;
export const selectWorksLoading = (state: RootState) => state.portfolio.works.loading;
export const selectSelectedWorkId = (state: RootState) => state.portfolio.works.selectedId;

export const selectTaggedWorks = createSelector(
  selectSelectedTagId,
  selectWorks,
  (tagId, works) => tagId && works ? works.filter(w => w.tags.includes(tagId)) : works,
);

/**
 * Maps the return value of `selectTaggedWorks()` to corresponding tags.
 */
export const selectTaggedWorksTags = createSelector(
  selectTags,
  selectTaggedWorks,
  (tags, works) => {
    if (!tags || !works) return [];
    return works.map(
      work => tags.filter(
        tag => work.tags.some(id => id === tag._id),
      ),
    );
  },
);
