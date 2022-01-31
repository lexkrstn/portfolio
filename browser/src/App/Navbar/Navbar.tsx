import { push } from 'connected-react-router';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { openContactDialog } from '../duck';
import Logo from './Logo';
import * as S from './styles';

type RouteNav = { path: string, name: string };

const menuItems: RouteNav[] = [
  { path: '/', name: 'Home' },
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/about', name: 'About' },
];

/**
 * The main navigation bar at the top of the page.
 */
export default function Navbar(): ReactElement {
  const location = useLocation();
  const dispatch = useDispatch();
  const handlers = useMemo(() => { // eslint-disable-line arrow-body-style
    return menuItems.map(({ path }) => { // eslint-disable-line arrow-body-style
      return () => dispatch(push(path));
    });
  }, []);
  const onContactClick = useCallback(() => dispatch(openContactDialog()), []);
  const activePath = menuItems
    .map(item => item.path)
    .find(path => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    });
  return (
    <S.Navbar fixed={location.pathname !== '/'}>
      <S.Container>
        <S.Brand onClick={handlers[0]}>
          <Logo />
        </S.Brand>
        <S.Nav>
          {menuItems.map(({ path, name }, i) => (
            <S.NavItem key={path}>
              <S.NavLink onClick={handlers[i]}>{name}</S.NavLink>
              <S.NavItemUnderline active={path === activePath} />
            </S.NavItem>
          ))}
          <S.NavItem key="contact">
            <S.NavLink onClick={onContactClick}>Contact</S.NavLink>
          </S.NavItem>
        </S.Nav>
      </S.Container>
    </S.Navbar>
  );
}
