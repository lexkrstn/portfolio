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
  font-family: ${({ theme }) => theme.font.family.heading};
  cursor: pointer;
  transition: font-size ${({ theme }) => theme.routeRiffleDuration}ms ease;

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
  color: #333;
  text-decoration: none;
  margin-bottom: 15px;
  &:hover {
    color: #1eb902;
  }
`;

type Network = 'linkedin' | 'github';

const BRAND_COLORS: Record<Network, string> = {
  linkedin: '#2867B2',
  github: '#333',
};

export const SocialIcon = styled.span<{ network: Network }>`
  display: inline-block;
  vertical-align: middle;
  line-height: 0;
  ${({ network }) => `color: ${BRAND_COLORS[network]};`}
`;

export const SocialName = styled.span`
  vertical-align: middle;
  margin-left: 0.6em;
  transition: color .2s ease;
`;
