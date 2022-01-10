import styled from '@emotion/styled';

export const SocialNav = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  padding: 7px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .13);
`;

export const SocialButton = styled.a`
  display: block;
  text-decoration: none;
  color: #fff;
  line-height: 1;
  font-size: 0;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 100ms ease;

  &:last-child { margin-bottom: 0; }

  &:hover { transform: scale(1.1); }
`;
