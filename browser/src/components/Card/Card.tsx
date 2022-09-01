import { push } from 'connected-react-router';
import React, { MouseEvent, FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Chip, { ChipGroup } from '../Chip';
import Image from '../Image';
import { Tag } from '../../entities';
import * as S from './styles';

/**
 * Used by Image components to store image cache data in it.
 * Note, it's ok to put it here since loading images doesn't perform in SSR.
 */
const imageCache = {};

export interface Props {
  caption: string;
  cover: string;
  route: string;
  tags: Tag[];
  onClick?: () => void;
  onClickTag?: (id: string) => void;
}

/**
 * Portfolio item card.
 */
const Card: FC<Props> = ({ caption, cover, onClickTag, route, tags }) => {
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
        onClickTag(tag._id);
      }
    }),
    [tags],
  );

  const oneDelay = 300 / tags.length;

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
                key={tag._id}
                onClick={clickCallbacks[i]}
                style={{ transitionDelay: `${oneDelay * i}ms` }}
              >
                {tag.name}
              </Chip>
            ))}
          </ChipGroup>
          <S.Button style={{ transitionDelay: `${oneDelay * sortedTags.length}ms` }}>
            Open
            <S.ButtonLinkIcon />
          </S.Button>
        </S.Overlay>
        <S.Cover>
          <Image aspect={2} alt={caption} src={cover} cache={imageCache} />
        </S.Cover>
      </S.Content>
    </S.Card>
  );
};

Card.displayName = 'Card';

export default Card;
