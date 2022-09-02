import styled from '@emotion/styled';

export const Appeal = styled.div`
  margin-top: 50px;
  text-align: center;
  font-weight: 300;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }
`;

export const Heading = styled.h5`
  margin: 0 0 2px;
  font-weight: 400;
  font-size: 1.15em;
  line-height: 1.7em;
  text-transform: uppercase;
`;

export const Para = styled.p`
  margin: 0;
`;

export const Link = styled.span`
  color: inherit;
  text-decoration: none;
  font-weight: 400;
  cursor: pointer;
`;

export const SocialNav = styled.p`
  margin: 5px 0 0;
`;

export const SocialButton = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  line-height: 1;
  font-size: 0;
  margin-left: 10px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 100ms ease;

  &:first-child { margin-left: 0; }

  &:hover { opacity: 1; }
`;
