import { push } from 'connected-react-router';
import React, { MouseEvent, ReactElement, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Chip, { ChipGroup } from '../../widgets/Chip';
import Tag from '../duck/tags/Tag';
import * as S from './styles';

export interface CardProps {
  caption: string;
  cover: string;
  route: string;
  tags: Tag[];
  onClick?: () => void;
  onClickTag?: (id: number) => void;
}

export default function Card({ caption, cover, onClickTag, route, tags }: CardProps): ReactElement {
  const dispatch = useDispatch();

  const onHostClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      dispatch(push(route));
    },
    [route],
  );

  const sortedTags = useMemo(
    () => !tags ? [] : tags.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [tags],
  );

  const clickCallbacks = useMemo(
    () => sortedTags.map(tag => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      if (onClickTag) {
        onClickTag(tag.id);
      }
    }),
    [tags],
  );

  return (
    <S.Card to={route} onClick={onHostClick}>
      <S.Caption>
        <S.CaptionButtons>
          <S.CaptionButton />
          <S.CaptionButton />
          <S.CaptionButton />
        </S.CaptionButtons>
        <S.Title>{caption}</S.Title>
      </S.Caption>
      <S.Content>
        <S.Overlay>
          <ChipGroup>
            {sortedTags.map((tag, i) => (
              <Chip
                key={tag.id}
                onClick={clickCallbacks[i]}
                style={{ transitionDelay: `${200 + 150 * i}ms` }}
              >
                {tag.name}
              </Chip>
            ))}
          </ChipGroup>
          <S.Button style={{ transitionDelay: `${200 + 150 * sortedTags.length}ms` }}>
            Open
            <S.ButtonLinkIcon />
          </S.Button>
        </S.Overlay>
        <S.Cover>
          <S.Image src={cover} alt={caption} />
        </S.Cover>
      </S.Content>
    </S.Card>
  );
}
