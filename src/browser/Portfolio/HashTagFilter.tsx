import React, { ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip, { ChipGroup } from '../widgets/Chip';
import { PortfolioSelectors, PortfolioActions } from './duck';

export default function HashTagFilter(): ReactElement {
  const dispatch = useDispatch();
  const selectedTagId = useSelector(PortfolioSelectors.getSelectedHashTagId);
  const tags = useSelector(PortfolioSelectors.getHashTags);
  const loadingTags = useSelector(PortfolioSelectors.areHashTagsLoading)

  const sortedTags = useMemo(
    () => !tags ? [] : [
      { id: 0, name: 'All' },
      ...tags.slice().sort((a, b) => a.name.localeCompare(b.name)),
    ],
    [tags],
  );

  const clickCallbacks = useMemo(
    () => sortedTags.map(tag => () => {
      dispatch(PortfolioActions.selectHashTag(tag.id));
    }),
    [tags],
  );

  useEffect(() => {
    if (!tags && !loadingTags) {
      dispatch(PortfolioActions.requestHashTags());
    }
  });

  return (
    <ChipGroup>
      {sortedTags.map((tag, i) => (
        <Chip
          key={tag.id}
          active={tag.id === selectedTagId}
          onClick={clickCallbacks[i]}
        >
          {tag.name}
        </Chip>
      ))}
    </ChipGroup>
  );
}
