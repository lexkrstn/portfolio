import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { containerMixin, containerWrapMixin } from '../../widgets/mixins';

export const Brand = styled.span`
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  font-size: 2em;
  font-family: ${props => props.theme.font.family.heading};
  cursor: pointer;
  transition: font-size ${props => props.theme.routeRiffleDuration} ease;

  svg {
    display: block;
    height: 1em;
  }
`;

export const Name = styled.span`
  display: block;
  margin-left: 0.8em;
  font-size: 0.7em;
  white-space: pre;
  line-height: 1.2;
  font-weight: 300;
`;

export const Navbar = styled.nav<{ fixed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: block;
  transform: translate3d(0,0,0);
  ${containerWrapMixin}
  height: 84px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2),rgba(1,0,0,0));
  border-bottom: 1px solid rgba(255,255,255,0.5);
  font-size: 16px;
  ${({ theme: { routeRiffleDuration: duration } }) => css`
    transition:
      background-color ${duration} ease,
      height ${duration} ease;
  `}

  ${props => props.fixed && css`
    position: fixed;
    height: 54px;
    background: rgba(0, 0, 0, .25);
    z-index: 1030;
    box-shadow: 0 1px 10px rgba(0,0,0,.3);
    border-color: rgba(255, 255, 255, 0.2);

    ${Brand} {
      font-size: 1.5em;
    }
  `}
`;

export const Container = styled.div`
  ${containerMixin}
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
`;

export const Hamburger = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;


  @media (min-width: ${props => props.theme.bp.sm}) {
    display: none;
  }
`;

export const HamburgerBars = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40px;
  height: 30px;
  transition: height .2s ease;

  ${Hamburger}:hover & {
    height: 34px;
  }
`;

export const HamburgerBar = styled.div`
  height: 3px;
  border-radius: 2px;
  background: #fff;
`;

export const Nav = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: ${props => props.theme.bp.sm}) {
    display: flex;
  }
`;

export const NavItem = styled.li`
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  transition: background-color .2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, .08);
  }
`;

export const NavItemUnderline = styled.div<{ active?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  height: 2px;
  background: transparent;
  pointer-events: none;
  transition: background-color ${props => props.theme.routeRiffleDuration} ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -4px;
    display: block;
    height: 0;
    width: 0;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    transition: border-color ${props => props.theme.routeRiffleDuration} ease;
  }

  ${props => props.active && css`
    background: white;

    &::after { border-bottom-color: white; }
  `}
`;

export const NavLink = styled.span`
  display: block;
  height: 100%;
  padding: 0 10px;
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  font-size: 1em;
  font-family: ${props => props.theme.font.family.heading};
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
`;
