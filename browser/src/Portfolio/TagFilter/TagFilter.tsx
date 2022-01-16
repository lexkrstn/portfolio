import React, { ReactElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip, { ChipGroup } from '../../widgets/Chip';
import { selectSelectedTagId, selectSortedTags, setTagSelected } from '../duck';
import { Tag } from '../interfaces';
import * as S from './styles';

export default function TagFilter(): ReactElement {
  const dispatch = useDispatch();
  const selectedTagId = useSelector(selectSelectedTagId);
  const tags = useSelector(selectSortedTags);

  const allTags = useMemo(
    () => !tags ? [] : [
      { _id: '', name: 'All' } as Tag,
      ...tags,
    ],
    [tags],
  );

  const clickCallbacks = useMemo(
    () => allTags.map(tag => () => {
      dispatch(setTagSelected(tag._id));
    }),
    [tags],
  );

  return (
    <S.TagFilter>
      {!!tags && (
        <ChipGroup>
          {allTags.map((tag, i) => (
            <Chip
              key={tag._id}
              active={tag._id === selectedTagId}
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
