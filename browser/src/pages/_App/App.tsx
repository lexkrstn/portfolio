import { ThemeProvider, Global } from '@emotion/react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { selectWalkMode } from '../Home/duck';
import theme from '../../theme';
import MobileDrawer from '../../components/MobileDrawer';
import ParallaxScroll from '../../components/ParallaxScroll';
import RouteRiffler from '../../components/RouteRiffler';
import ContactDialog from '../../components/ContactDialog';
import {
  selectSnackbar, closeSnackbar, selectMobileMenuOpen, closeMobileMenu,
} from './duck';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import PageNav from './PageNav';
import SocialNav from './SocialNav';
import * as S from './styles';

type Props = RouteConfigComponentProps;

const App: FC<Props> = ({ location, route: { routes } }) => {
  const dispatch = useDispatch();
  const walkMode = useSelector(selectWalkMode);
  const snackbar = useSelector(selectSnackbar);
  const mobileMenuOpen = useSelector(selectMobileMenuOpen);
  const parallaxHeight = (location.pathname === '/' && walkMode === 'scroll') ? 1 : 0;
  const handleCloseSnackbar = useCallback(() => {
    dispatch(closeSnackbar());
  }, []);
  const handleCloseMobileMenu = useCallback(() => {
    dispatch(closeMobileMenu());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <S.App>
        <MobileDrawer
          open={mobileMenuOpen ? 'right' : false}
          rightMenu={<MobileMenu />}
          onClose={handleCloseMobileMenu}
        >
          <ParallaxScroll
            height={parallaxHeight}
            resetOnChange={location.pathname}
            bigNavbar={location.pathname === '/'}
          >
            <Global styles={S.GlobalStyle} />
            <Navbar />
            <PageNav location={location} routes={routes} />
            <SocialNav />
            <RouteRiffler location={location} routes={routes} />
          </ParallaxScroll>
        </MobileDrawer>
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
};

App.displayName = 'App';

export default App;
