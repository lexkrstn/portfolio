import { push } from 'connected-react-router';
import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ParallaxScrollContext } from '../widgets/ParallaxScroll';
import ScrollButton from '../widgets/ScrollButton';
import Canvas from './Canvas';
import { getWalkMode } from './duck/selectors';
import * as S from './styles';

export default function Home() {
  const { scroll, resetScroll } = useContext(ParallaxScrollContext);
  const walkMode = useSelector(getWalkMode);
  const dispatch = useDispatch();
  const handleNavigateNext = useCallback(() => {
    resetScroll();
    setTimeout(() => {
      dispatch(push('/portfolio'));
    }, 0);
  }, []);
  return (
    <S.Home>
      <Canvas
        scroll={scroll}
        walkMode={walkMode}
        onNavigateNext={handleNavigateNext}
      />
      <S.Container>
        <ScrollButton />
      </S.Container>
    </S.Home>
  );
}
