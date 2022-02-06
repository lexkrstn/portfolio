import { push } from 'connected-react-router';
import React, { ReactElement, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Logo from '../Navbar/Logo';
import { closeMobileMenu, openContactDialog } from '../duck';
import menuItems from '../menu';
import SocialNav from './SocialNav';
import * as S from './styles';

/**
 * The mobile menu in the navigation drawer.
 */
export default function MobileMenu(): ReactElement {
  const location = useLocation();
  const dispatch = useDispatch();
  const handlers = useMemo(() => { // eslint-disable-line arrow-body-style
    return menuItems.map(({ path }) => { // eslint-disable-line arrow-body-style
      return () => {
        dispatch(closeMobileMenu());
        dispatch(push(path));
      };
    });
  }, []);
  const onContactClick = useCallback(() => {
    dispatch(closeMobileMenu());
    dispatch(openContactDialog());
  }, []);
  const onHeaderClick = useCallback(() => {
    dispatch(closeMobileMenu());
    dispatch(push('/'));
  }, []);
  return (
    <S.MobileMenu className={location.pathname === '/' ? 'navbar-fixed' : ''}>
      <S.Header onClick={onHeaderClick}>
        <S.Brand>
          <Logo />
          <S.Name>Alexander<br />Korostin</S.Name>
        </S.Brand>
      </S.Header>
      <S.Nav>
        {menuItems.map(({ path, name }, i) => (
          <S.NavLink key={path} onClick={handlers[i]}>{name}</S.NavLink>
        ))}
        <S.NavLink key="/contact" onClick={onContactClick}>Contact</S.NavLink>
      </S.Nav>
      <SocialNav />
    </S.MobileMenu>
  );
}
