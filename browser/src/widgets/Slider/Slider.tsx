import React, { ReactElement, useCallback, ReactNode, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as S from './styles';

export interface SliderProps {
  children: ReactElement[];
}

function createChildFactory(classNames: string) {
  return function childFactory(child: ReactElement): ReactElement {
    return React.cloneElement(child, { classNames });
  };
}

export default function Slider({ children }: SliderProps): ReactElement {
  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const slideCount = childrenArray.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const slidePrev = useCallback(() => {
    setActiveIndex(index => index === 0 ? slideCount - 1 : index - 1);
    setDirection('left');
  }, []);
  const slideNext = useCallback(() => {
    setActiveIndex(index => (index + 1) % slideCount);
    setDirection('right');
  }, []);
  const clickHandlers: (() => void)[] = [];
  for (let i = 0; i < slideCount; i++) {
    clickHandlers.push(() => {
      if (i !== activeIndex) {
        setActiveIndex(i);
        setDirection(i > activeIndex ? 'right' : 'left');
      }
    });
  }
  const effect = `slide-${direction}`;
  const correctedIndex = activeIndex % slideCount;
  const activeChild = childrenArray[correctedIndex];
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
            key={`${child.key}-${i}`}
            active={i === correctedIndex}
            onClick={clickHandlers[i]}
          />
        ))}
      </S.Pills>
    </S.Slider>
  );
}
