import { css } from '@emotion/react';
import styled from '@emotion/styled';

const NAVBAR_HEIGHT = 54;
const BIG_NAVBAR_HEIGHT = 84;

export const ScrollBar = styled.div<{ bigNavbar?: boolean, visible?: boolean }>`
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 2px;
  bottom: 10px;
  width: 4px;
  border-radius: 2px;
  background: rgba(0, 0, 0, .14);
  ${({ theme: { routeRiffleDuration: duration } }) => css`
    transition:
      opacity ${duration}ms ease,
      margin-top ${duration}ms ease;
  `}
  ${({ bigNavbar }) => css`
    margin-top: ${bigNavbar ? BIG_NAVBAR_HEIGHT : NAVBAR_HEIGHT}px;
  `}
  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
  `}
`;

export const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  border-radius: 2px;
  background: rgba(255, 255, 255, .41);
  will-change: top;
`;
