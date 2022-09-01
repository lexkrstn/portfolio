import { push } from 'connected-react-router';
import React, { FC, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ParallaxScrollContext } from '../../components/ParallaxScroll';
import ScrollButton from '../../components/ScrollButton';
import Canvas from '../../components/Canvas';
import { selectWalkMode } from './duck';
import * as S from './styles';

const Home: FC = () => {
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
};

Home.displayName = 'Home';

export default Home;
