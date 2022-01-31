import { ThemeProvider, Global } from '@emotion/react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath } from 'react-router';
import { RouteConfigComponentProps } from 'react-router-config';
import { selectWalkMode } from '../Home/duck';
import theme from '../theme';
import { isRootRoute } from '../utils/routes';
import ParallaxScroll from '../widgets/ParallaxScroll';
import RouteRiffler from '../widgets/RouteRiffler';
import ContactDialog from './ContactDialog';
import { selectSnackbar, closeSnackbar } from './duck';
import Navbar from './Navbar';
import PageNav from './PageNav';
import SocialNav from './SocialNav';
import * as S from './styles';

type AppProps = RouteConfigComponentProps;

export default function App({ location, route: { routes } }: AppProps): ReactElement {
  const dispatch = useDispatch();
  const walkMode = useSelector(selectWalkMode);
  const snackbar = useSelector(selectSnackbar);
  const parallaxHeight = (location.pathname === '/' && walkMode === 'scroll') ? 1 : 0;
  const activeRoute = routes.find(aRoute => matchPath(location.pathname, aRoute));
  const handleCloseSnackbar = useCallback(() => {
    dispatch(closeSnackbar());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <S.App>
        <ParallaxScroll height={parallaxHeight} resetOnChange={location.pathname}>
          <Global styles={S.GlobalStyle} />
          <Navbar />
          {isRootRoute(activeRoute, routes) && (
            <>
              <PageNav location={location} routes={routes} />
              <SocialNav />
            </>
          )}
          <RouteRiffler location={location} routes={routes} />
        </ParallaxScroll>
        <ContactDialog />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={snackbar.duration}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </S.App>
    </ThemeProvider>
  );
}
