import React, { ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip, { ChipGroup } from '../widgets/Chip';
import { selectors, actions } from './duck';

export default function HashTagFilter(): ReactElement {
  const dispatch = useDispatch();
  const selectedTagId = useSelector(selectors.tags.getSelectedId);
  const tags = useSelector(selectors.tags.getTags);
  const loadingTags = useSelector(selectors.tags.areLoading)

  const sortedTags = useMemo(
    () => !tags ? [] : [
      { id: 0, name: 'All' },
      ...tags.slice().sort((a, b) => a.name.localeCompare(b.name)),
    ],
    [tags],
  );

  const clickCallbacks = useMemo(
    () => sortedTags.map(tag => () => {
      dispatch(actions.tags.select(tag.id));
    }),
    [tags],
  );

  useEffect(() => {
    if (!tags && !loadingTags) {
      dispatch(actions.tags.request());
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
