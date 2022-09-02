import { push } from 'connected-react-router';
import { Location } from 'history';
import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { matchPath } from 'react-router';
import { RouteConfig } from 'react-router-config';
import Tooltip from '../../../components/Tooltip';
import { isRootRoute } from '../../../utils/routes';
import menuItems from '../menu';
import * as S from './styles';

interface Props {
  routes: RouteConfig[];
  location: Location;
}

const PageNav: FC<Props> = ({ location, routes }) => {
  const dispatch = useDispatch();
  const rootRoutes = routes.filter(route => isRootRoute(route, routes));
  const activeRoute = routes.find(route => matchPath(location.pathname, route));
  const handleButtonClick = (event: MouseEvent<HTMLDivElement>) => {
    dispatch(push(event.currentTarget.dataset.route));
  };
  return (
    <S.PageNav>
      {rootRoutes.map(route => (
        <S.PageButton
          key={route.path as string}
          onClick={handleButtonClick}
          data-route={route.path}
        >
          <Tooltip
            position="right"
            message={menuItems.find(item => item.path === route.path)?.name}
            offset={15}
          >
            <S.PageCircle active={route.path === activeRoute.path} />
          </Tooltip>
        </S.PageButton>
      ))}
    </S.PageNav>
  );
};

PageNav.displayName = 'PageNav';

export default PageNav;
