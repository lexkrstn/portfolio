import { push } from 'connected-react-router';
import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ParallaxScrollContext } from '../widgets/ParallaxScroll';
import ScrollButton from '../widgets/ScrollButton';
import Canvas from './Canvas';
import { selectWalkMode } from './duck';
import * as S from './styles';

export default function Home() {
  const {
    resetScroll, addScrollListener, removeScrollListener,
  } = useContext(ParallaxScrollContext);
  const walkMode = useSelector(selectWalkMode);
  const dispatch = useDispatch();

  const navigatePortfolio = useCallback(() => {
    resetScroll();
    setTimeout(() => {
      dispatch(push('/portfolio'));
    }, 0);
  }, [resetScroll]);

  return (
    <S.Home>
      <Canvas
        walkMode={walkMode}
        onReachedEnd={navigatePortfolio}
        addScrollListener={addScrollListener}
        removeScrollListener={removeScrollListener}
      />
      <S.Container>
        <ScrollButton />
      </S.Container>
    </S.Home>
  );
}
