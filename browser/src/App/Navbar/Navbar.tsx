import { push } from 'connected-react-router';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { openContactDialog, toggleMobileMenu } from '../duck';
import menuItems from '../menu';
import Logo from './Logo';
import * as S from './styles';

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
  const onHamburgerClick = useCallback(() => dispatch(toggleMobileMenu()), []);
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
        <S.Hamburger>
          <S.HamburgerBars onClick={onHamburgerClick}>
            <S.HamburgerBar />
            <S.HamburgerBar />
            <S.HamburgerBar />
          </S.HamburgerBars>
        </S.Hamburger>
      </S.Container>
    </S.Navbar>
  );
}
