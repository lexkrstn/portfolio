import { push } from 'connected-react-router';
import { Location } from 'history';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { contactDialog } from '../duck';
import Logo from './Logo';
import * as S from './styles';

type RouteNav = { route: string, name: string };

const routeNavs: RouteNav[] = [
  { route: '/', name: 'Home' },
  { route: '/portfolio', name: 'Portfolio' },
  { route: '/about', name: 'About' },
];

interface NavbarProps {
  location: Location;
}

export default function Navbar({ location }: NavbarProps): ReactElement {
  const dispatch = useDispatch();
  const handlers = useMemo(() => { // eslint-disable-line arrow-body-style
    return routeNavs.map(({ route }) => { // eslint-disable-line arrow-body-style
      return () => dispatch(push(route));
    });
  }, []);
  const openContactDialog = useCallback(() => dispatch(contactDialog.open()), []);
  return (
    <S.Navbar fixed={location.pathname !== '/'}>
      <S.Container>
        <S.Brand onClick={handlers[0]}>
          <Logo />
        </S.Brand>
        <S.Nav>
          {routeNavs.map(({ route, name }, i) => (
            <S.NavItem key={route}>
              <S.NavLink onClick={handlers[i]}>{name}</S.NavLink>
            </S.NavItem>
          ))}
          <S.NavItem key="contact">
            <S.NavLink onClick={openContactDialog}>Contact</S.NavLink>
          </S.NavItem>
        </S.Nav>
      </S.Container>
    </S.Navbar>
  );
}
