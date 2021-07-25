import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { ThemeProvider } from 'styled-components';
import { getWalkMode } from '../Home/duck/selectors';
import theme from '../theme';
import ParallaxScroll from '../widgets/ParallaxScroll';
import RouteRiffler from '../widgets/RouteRiffler';
import Navbar from './Navbar';
import PageNav from './PageNav';
import SocialNav from './SocialNav';
import * as S from './styles';

type AppProps = RouteConfigComponentProps;

export default function App({ location, route: { routes } }: AppProps): ReactElement {
  const walkMode = useSelector(getWalkMode);
  const parallaxHeight = (location.pathname === '/' && walkMode === 'scroll') ? 1 : 0;
  return (
    <ThemeProvider theme={theme}>
      <S.App>
        <ParallaxScroll height={parallaxHeight} resetOnChange={location.pathname}>
          <S.GlobalStyle />
          <Navbar location={location} />
          <PageNav location={location} routes={routes} />
          <SocialNav />
          <RouteRiffler location={location} routes={routes} />
        </ParallaxScroll>
      </S.App>
    </ThemeProvider>
  );
}
