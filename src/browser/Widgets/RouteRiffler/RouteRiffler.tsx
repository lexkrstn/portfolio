import { Location } from 'history';
import React, { ReactElement, useRef } from 'react';
import { matchPath } from 'react-router';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GlobalStyle } from './styles';

interface RouteRifflerProps {
  routes: RouteConfig[];
  location: Location;
}

function transitionEndListener(node: HTMLElement, done: () => void): void {
  node.addEventListener('transitionend', done, false);
}

function createChildFactory(classNames: string) {
  return function childFactory(child: ReactElement): ReactElement {
    return React.cloneElement(child, { classNames });
  };
}

export default function RouteRiffler(props: RouteRifflerProps): ReactElement {
  const routeIdx = props.routes.findIndex(route => matchPath(props.location.pathname, route));
  const oldRouteIdx = useRef(routeIdx);
  const effect = routeIdx > oldRouteIdx.current ? 'scroll-down' : 'scroll-up';
  oldRouteIdx.current = routeIdx;
  return (
    <>
      <GlobalStyle />
      <TransitionGroup component={React.Fragment} childFactory={createChildFactory(effect)}>
        <CSSTransition<undefined>
          key={props.location.pathname}
          addEndListener={transitionEndListener}
          classNames={effect}
        >
          {renderRoutes(props.routes, {}, { location: props.location })}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

// {props.routes.map((route, i) => (
//   <Route
//     path={route.path}
//     exact={route.exact}
//     strict={route.strict}
//     location={props.location}
//   >
//     {({ match }) => (
//       <CSSTransition<undefined>
//         key={i}
//         in={!!match}
//         addEndListener={transitionEndListener}
//         classNames={effect}
//         unmountOnExit
//       >
//         {React.createElement(route.component)}
//       </CSSTransition>
//     )}
//   </Route>
// ))}
