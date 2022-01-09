import { ThemeProvider, Global } from '@emotion/react';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { matchPath } from 'react-router';
import { RouteConfigComponentProps } from 'react-router-config';
import { getWalkMode } from '../Home/duck/selectors';
import theme from '../theme';
import { isRootRoute } from '../utils/routes';
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
  const activeRoute = routes.find(aRoute => matchPath(location.pathname, aRoute));
  return (
    <ThemeProvider theme={theme}>
      <S.App>
        <ParallaxScroll height={parallaxHeight} resetOnChange={location.pathname}>
          <Global styles={S.GlobalStyle} />
          <Navbar location={location} />
          {isRootRoute(activeRoute, 0, routes) && <>
            <PageNav location={location} routes={routes} />
            <SocialNav />
          </>}
          <RouteRiffler location={location} routes={routes} />
        </ParallaxScroll>
      </S.App>
    </ThemeProvider>
  );
}
