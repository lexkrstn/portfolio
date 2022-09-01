import { push } from 'connected-react-router';
import React, { FC, MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Typewriter from '../../../components/Typewriter';
import { openContactDialog, toggleMobileMenu } from '../duck';
import menuItems from '../menu';
import Logo from './Logo';
import * as S from './styles';

/**
 * The main navigation bar at the top of the page.
 */
const Navbar: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleClickNavItem = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const itemIndex = parseInt(event.currentTarget.dataset.itemIndex, 10);
    dispatch(push(menuItems[itemIndex].path));
  }, []);
  const handleContactClick = useCallback(() => dispatch(openContactDialog()), []);
  const handleHamburgerClick = useCallback(() => dispatch(toggleMobileMenu()), []);
  const activePath = menuItems
    .map(item => item.path)
    .find(path => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    });
  return (
    <S.Navbar fixed={location.pathname !== '/'}>
      <S.Container>
        <S.Brand onClick={handleClickNavItem} data-item-index="0">
          <Logo />
          {location.pathname === '/portfolio' && (
            <S.Name>
              <Typewriter
                keyframes={[
                  { text: 'Alexander' },
                  { text: '\nKorostin' },
                  { clear: 18, delay: 10000 },
                ]}
              />
            </S.Name>
          )}
        </S.Brand>
        <S.Nav>
          {menuItems.map(({ path, name }, i) => (
            <S.NavItem key={path}>
              <S.NavLink onClick={handleClickNavItem} data-item-index={i}>
                {name}
              </S.NavLink>
              <S.NavItemUnderline active={path === activePath} />
            </S.NavItem>
          ))}
          <S.NavItem key="contact">
            <S.NavLink onClick={handleContactClick}>Contact</S.NavLink>
          </S.NavItem>
        </S.Nav>
        <S.Hamburger>
          <S.HamburgerBars onClick={handleHamburgerClick}>
            <S.HamburgerBar />
            <S.HamburgerBar />
            <S.HamburgerBar />
          </S.HamburgerBars>
        </S.Hamburger>
      </S.Container>
    </S.Navbar>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
