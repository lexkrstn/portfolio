import { Location } from 'history';
import React, { ReactElement, useCallback, useRef } from 'react';
import { matchPath } from 'react-router';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as S from './styles';
import GlobalStyles from './GlobalStyles';

interface RouteRifflerProps {
  routes: RouteConfig[];
  location: Location;
}

function createChildFactory(classNames: string) {
  return function childFactory(child: ReactElement): ReactElement {
    return React.cloneElement(child, { classNames });
  };
}

export default function RouteRiffler({ location, routes }: RouteRifflerProps): ReactElement {
  const routeIdx = routes.findIndex(route => matchPath(location.pathname, route));
  const oldRouteIdx = useRef(routeIdx);
  const cube = useRef<HTMLDivElement>();
  const host = useRef<HTMLDivElement>();
  const effect = routeIdx > oldRouteIdx.current ? 'scroll-down' : 'scroll-up';
  oldRouteIdx.current = routeIdx;

  const transitionEndListener = useCallback((node: HTMLElement, done: () => void) => {
    const listener = () => {
      node.removeEventListener('transitionend', listener, false);
      done();
    };
    node.addEventListener('transitionend', listener, false);
  }, []);

  // Note, setting the perspective creates a new coordinate system and makes
  // fixed elements to be positioned relating to it rather than the window.
  // In order to prevent this the 3d styles must be removed after animation ends.

  const onTransitionEnter = () => {
    host.current.style.perspective = '100vw';
    cube.current.style.transformStyle = 'preserve-3d';
  };

  const onTransitionExited = () => {
    host.current.style.perspective = 'none';
    cube.current.style.transformStyle = 'flat';
  };

  return (
    <S.RouteRiffler ref={host}>
      <GlobalStyles />
      <S.Cube ref={cube}>
        <TransitionGroup component={React.Fragment} childFactory={createChildFactory(effect)}>
          <CSSTransition<undefined>
            key={location.pathname}
            addEndListener={transitionEndListener}
            classNames={effect}
            onEnter={onTransitionEnter}
            onExited={onTransitionExited}
          >
            {renderRoutes(routes, {}, { location })}
          </CSSTransition>
        </TransitionGroup>
      </S.Cube>
    </S.RouteRiffler>
  );
}
