import styled from '@emotion/styled';

export const MobileMenu = styled.div`
  color: #222;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #0487af;
  width: 100%;
  height: 54px;
  color: #0487af;
  text-decoration: none;
  cursor: pointer;

  ${MobileMenu}.navbar-fixed & {
    height: 84px;
  }
`;

export const Brand = styled.span`
  display: flex;
  align-items: center;
  margin-right: 20px;
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

export const Name = styled.div`
  font-size: 1rem;
  line-height: 1.2;
  margin-left: 10px;
`;

export const SubHeader = styled.div`
  font-size: .75em;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 15px;
`;

export const Nav = styled.nav`
  margin: 20px 0;
`;

export const NavLink = styled.span`
  display: block;
  padding: 5px 15px;
  margin-bottom: 5px;
  text-decoration: none;
  color: inherit;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color .2s ease;

  &:hover {
    background: rgba(0, 33, 55, .05);
  }
`;

export const SocialNav = styled.nav`
  margin: 0 15px;
  transform: translate3d(0, 0, 0);
`;

export const SocialButton = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  margin-bottom: 15px;

  &.linkedin {
    color: #2867B2;
  }

  &.github {
    color: #333;
  }

  svg {
    vertical-align: middle;
  }
`;

export const SocialName = styled.span`
  vertical-align: middle;
  margin-left: 0.6em;
  color: #333;
  transition: color .2s ease;

  ${SocialButton}:hover & {
    color: #1eb902;
  }
`;
