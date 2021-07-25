import { push } from 'connected-react-router';
import { Location } from 'history';
import React, { ReactElement, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Logo from './Logo';
import * as S from './styles';

const routeNavs: Array<{ route: string, name: string }> = [
  { route: '/', name: 'Home' },
  { route: '/portfolio', name: 'Portfolio' },
  { route: '/about', name: 'About' },
];

interface NavbarProps {
  location: Location;
}

export default function Navbar({ location }: NavbarProps): ReactElement {
  const dispatch = useDispatch();
  const handlers = useMemo(() => {
    return routeNavs.map(({ route }) => {
      return () => dispatch(push(route));
    });
  }, []);
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
            <S.NavLink >Contact</S.NavLink>
          </S.NavItem>
        </S.Nav>
      </S.Container>
    </S.Navbar>
  );
}
