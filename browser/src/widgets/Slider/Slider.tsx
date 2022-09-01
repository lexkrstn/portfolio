import React, { MouseEvent, FC, ReactElement, useCallback, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as S from './styles';

export interface Props {
  children: ReactElement[];
}

function createChildFactory(classNames: string) {
  return function childFactory(child: ReactElement): ReactElement {
    return React.cloneElement(child, { classNames });
  };
}

const Slider: FC<Props> = ({ children }) => {
  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const slideCount = childrenArray.length;
  const [{ activeIndex, direction }, setSlideState] = useState({
    activeIndex: 0,
    direction: 'right' as 'right' | 'left',
  });
  const effect = `slide-${direction}`;
  // This is required for the cases when child count decreases
  const correctedIndex = activeIndex % slideCount;
  const activeChild = childrenArray[correctedIndex];

  const slidePrev = useCallback(() => {
    setSlideState(({ activeIndex: index }) => ({
      activeIndex: index <= 0 ? slideCount - 1 : index - 1,
      direction: 'left',
    }));
  }, [slideCount]);

  const slideNext = useCallback(() => {
    setSlideState(({ activeIndex: index }) => ({
      activeIndex: index >= slideCount - 1 ? 0 : index + 1,
      direction: 'right',
    }));
  }, [slideCount]);

  const onPillClick = useCallback((event: MouseEvent<HTMLLIElement>) => {
    const nextIndex = parseInt(event.currentTarget.dataset.index ?? '0', 10);
    setSlideState(({ activeIndex: index }) => ({
      activeIndex: nextIndex,
      direction: nextIndex > index ? 'right' : 'left',
    }));
  }, []);

  return (
    <S.Slider>
      <S.Frame>
        <S.LeftArea onClick={slidePrev}>
          <ChevronLeftIcon fontSize="large" />
        </S.LeftArea>
        <S.RightArea onClick={slideNext}>
          <ChevronRightIcon fontSize="large" />
        </S.RightArea>
        <TransitionGroup component={null} childFactory={createChildFactory(effect)}>
          <CSSTransition key={correctedIndex} classNames={effect} timeout={300}>
            <S.Slide key={`${activeChild.key}-${correctedIndex}`}>
              {activeChild}
            </S.Slide>
          </CSSTransition>
        </TransitionGroup>
      </S.Frame>
      <S.Pills>
        {childrenArray.map((child, i) => (
          <S.Pill
            key={child.key}
            active={i === correctedIndex}
            onClick={onPillClick}
          />
        ))}
      </S.Pills>
    </S.Slider>
  );
};

Slider.displayName = 'Slider';

export default Slider;
