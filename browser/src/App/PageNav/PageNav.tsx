import { push } from 'connected-react-router';
import { Location } from 'history';
import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { matchPath } from 'react-router';
import { RouteConfig } from 'react-router-config';
import { isRootRoute } from '../../utils/routes';
import * as S from './styles';

interface Props {
  routes: RouteConfig[];
  location: Location;
}

const PageNav: FC<Props> = ({ location, routes }) => {
  const dispatch = useDispatch();
  const { rootRoutes, clickHandlers } = useMemo(() => {
    const filteredRoutes = routes.filter(route => isRootRoute(route, routes));
    return {
      clickHandlers: filteredRoutes.map(route => () => {
        dispatch(push(Array.isArray(route.path) ? route.path[0] : route.path));
      }),
      rootRoutes: filteredRoutes,
    };
  }, []);
  const activeRoute = routes.find(route => matchPath(location.pathname, route));
  return (
    <S.PageNav>
      {rootRoutes.map((route, i) => (
        <S.PageButton
          key={route.path as string}
          active={route.path === activeRoute.path}
          onClick={clickHandlers[i]}
        />
      ))}
    </S.PageNav>
  );
};

PageNav.displayName = 'PageNav';

export default PageNav;
