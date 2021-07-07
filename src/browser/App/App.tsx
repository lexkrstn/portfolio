import { push } from 'connected-react-router';
import debounce from 'lodash/debounce';
import React, { WheelEvent } from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { RouteConfigComponentProps } from 'react-router-config';
import { Dispatch } from 'redux';
import { ThemeProvider } from 'styled-components';
import { RootState } from '../rootReducer';
import theme from '../theme';
import RouteRiffler from '../Widgets/RouteRiffler';
import Navbar from './Navbar';
import PageNav from './PageNav';
import SocialNav from './SocialNav';
import * as S from './styles';

interface AppFluxProps {}

interface AppFluxActions {
  navigate: (path: string) => void;
}

type AppProps = AppFluxProps & AppFluxActions & RouteConfigComponentProps;

class App extends React.Component<AppProps> {
  public render() {
    const { location, route: { routes } } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <S.App onWheel={this.onWheel}>
          <S.GlobalStyle />
          <Navbar location={location} />
          <PageNav location={location} routes={routes} />
          <SocialNav />
          <RouteRiffler location={location} routes={routes} />
        </S.App>
      </ThemeProvider>
    );
  }

  private onWheel = debounce((e: WheelEvent): void => {
    const { location, route: { routes } } = this.props;
    const routeIdx = routes.findIndex(route => matchPath(location.pathname, route));
    const page = routeIdx + 1;
    const numPages = routes.filter(route => route.path !== '*').length;
    const deltaIdx = (page > 1 && e.deltaY < 0) ? -1 : (page < numPages && e.deltaY > 0 ? 1 : 0);
    if (deltaIdx !== 0) {
      this.props.navigate(routes[routeIdx + deltaIdx].path as string);
    }
  }, 50, { leading: true, trailing: false });
}

const mapStateToProps = (state: RootState): AppFluxProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): AppFluxActions => ({
  navigate: (path: string) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
