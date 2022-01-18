import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { containerMixin, containerWrapMixin } from '../../widgets/mixins';

export const Brand = styled.span`
  display: block;
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

const fixedNavbarMixin = css`
  position: fixed;
  padding-top: 15px;
  padding-bottom: 15px;
  background: rgba(0, 0, 0, .25);
  z-index: 1030;
  box-shadow: 0 1px 10px rgba(0,0,0,.3);
  border-color: rgba(255, 255, 255, 0.2);

  ${Brand} {
    font-size: 1.5em;
  }
`;

export const Navbar = styled.nav<{ fixed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: block;
  ${containerWrapMixin}
  padding-top: 25px;
  padding-bottom: 25px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2),rgba(1,0,0,0));
  border-bottom: 1px solid rgba(255,255,255,0.5);
  font-size: 16px;
  ${({ theme: { routeRiffleDuration: duration } }) => css`
    transition:
      background-color ${duration} ease,
      padding-top ${duration} ease,
      padding-bottom ${duration} ease;
  `}

  ${props => !!props.fixed && fixedNavbarMixin}
`;

export const Container = styled.div`
  ${containerMixin}
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Nav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: ${props => props.theme.bp.sm}) {
    display: flex;
  }
`;

export const NavItem = styled.li`
  display: block;
  margin: 0;
  padding: 0;
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
