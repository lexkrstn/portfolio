import React, { ReactElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip, { ChipGroup } from '../../widgets/Chip';
import { selectors, actions } from '../duck';
import * as S from './styles';

export default function TagFilter(): ReactElement {
  const dispatch = useDispatch();
  const selectedTagId = useSelector(selectors.tags.getSelectedId);
  const tags = useSelector(selectors.tags.getTags);

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

  return (
    <S.TagFilter>
      {!!tags && (
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
      )}
    </S.TagFilter>
  );
}
