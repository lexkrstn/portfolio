import { push } from 'connected-react-router';
import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Typewriter from '../../../components/Typewriter';
import TypewriterKeyframe from '../../../components/Typewriter/TypewriterKeyframe';
import theme from '../../../theme';
import { openContactDialog, toggleMobileMenu } from '../duck';
import menuItems from '../menu';
import Logo from './Logo';
import * as S from './styles';

const KEYFRAMES: TypewriterKeyframe[] = [
  { text: 'Alexander' },
  { text: '\nKorostin' },
  { clear: 18, delay: 10000 },
];

/**
 * The main navigation bar at the top of the page.
 */
const Navbar: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = menuItems
    .map(item => item.path)
    .find(path => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    });
  const currentNavRef = useRef<HTMLUListElement>(null);
  const currentNavItemRef = useRef<HTMLLIElement>(null);
  const dynamicUnderlineRef = useRef<HTMLDivElement>(null);
  const [activePath, setActivePath] = useState(currentPath);

  const handleClickNavItem = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const itemIndex = parseInt(event.currentTarget.dataset.itemIndex, 10);
    dispatch(push(menuItems[itemIndex].path));
  }, []);

  const handleContactClick = useCallback(() => dispatch(openContactDialog()), []);
  const handleHamburgerClick = useCallback(() => dispatch(toggleMobileMenu()), []);

  useEffect(() => {
    const underline = dynamicUnderlineRef.current;
    if (!underline) return;
    const navRect = currentNavRef.current.getBoundingClientRect();
    const itemRect = currentNavItemRef.current.getBoundingClientRect();
    underline.style.left = `${itemRect.left - navRect.left}px`;
    underline.style.width = `${itemRect.width}px`;
    if (activePath !== currentPath) {
      setActivePath(''); // transition state
      let timeoutId = setTimeout(() => {
        setActivePath(currentPath);
        timeoutId = null;
      }, theme.routeRiffleDuration);
      return () => { // eslint-disable-line consistent-return
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [currentPath]);

  return (
    <S.Navbar fixed={location.pathname !== '/'}>
      <S.Container>
        <S.Brand onClick={handleClickNavItem} data-item-index="0">
          <Logo />
          {location.pathname === '/portfolio' && (
            <S.Name>
              <Typewriter keyframes={KEYFRAMES} />
            </S.Name>
          )}
        </S.Brand>
        <S.Nav ref={currentNavRef}>
          {menuItems.map(({ path, name }, i) => (
            <S.NavItem
              key={path}
              ref={path === currentPath ? currentNavItemRef : undefined}
            >
              <S.NavLink onClick={handleClickNavItem} data-item-index={i}>
                {name}
              </S.NavLink>
              <S.NavItemUnderline active={path === activePath} />
            </S.NavItem>
          ))}
          <S.NavItem key="contact">
            <S.NavLink onClick={handleContactClick}>Contact</S.NavLink>
          </S.NavItem>
          <S.NavItemUnderline ref={dynamicUnderlineRef} active={!activePath} />
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
