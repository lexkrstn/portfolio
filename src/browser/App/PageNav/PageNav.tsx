import { push } from 'connected-react-router';
import { Location } from 'history';
import React, { ReactElement, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { matchPath } from 'react-router';
import { RouteConfig } from 'react-router-config';
import * as S from './styles';

interface PageNavProps {
  routes: RouteConfig[];
  location: Location;
}

export default function PageNav({ location, routes }: PageNavProps): ReactElement {
  const activeIdx = routes.findIndex(route => matchPath(location.pathname, route));
  const dispatch = useDispatch();
  const pageRoutes = routes.filter(route => route.path !== '*');
  const clickHandlers = useMemo(() => {
    return pageRoutes.map(route => () => {
      dispatch(push(Array.isArray(route.path) ? route.path[0] : route.path));
    });
  }, []);
  return (
    <S.PageNav>
      {pageRoutes.map((route, i) => (
        <S.PageButton key={i} active={i === activeIdx} onClick={clickHandlers[i]} />
      ))}
    </S.PageNav>
  );
}
