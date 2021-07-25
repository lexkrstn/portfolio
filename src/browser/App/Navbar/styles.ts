import styled, { css, ThemeProps } from 'styled-components';
import { containerMixin, containerWrapMixin } from '../../widgets/mixins';
import { Theme } from '../../theme';

const fixedNavbarMixin = (props: ThemeProps<Theme>) => css`
  position: fixed;
  padding-top: 15px;
  padding-bottom: 15px;
  background: rgba(0, 0, 0, .25);
  z-index: ${props => props.theme.zindex.navbarFixed};
  box-shadow: 0 1px 10px rgba(0,0,0,.3);
  border-bottom-color: #aaa;

  ${Brand} {
    font-size: 1.5em;
  }
`;

export const Navbar = styled.nav<{ fixed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zindex.navbar};
  display: block;
  ${containerWrapMixin}
  padding-top: 25px;
  padding-bottom: 25px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2),rgba(1,0,0,0));
  border-bottom: 1px solid rgba(255,255,255,0.5);
  font-size: 16px;
  transition:
    background-color .2s ease,
    padding-top .2s ease,
    padding-bottom .2s ease;

  ${props => props.fixed ? fixedNavbarMixin(props) : ''}
`;

export const Container = styled.div`
  ${containerMixin}
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Brand = styled.span`
  display: block;
  margin-right: 20px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  font-size: 2em;
  font-family: ${props => props.theme.font.family.headings};
  cursor: pointer;
  transition: font-size .2s ease;

  svg {
    display: block;
    height: 1em;
  }
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
  font-family: ${props => props.theme.font.family.headings};
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
