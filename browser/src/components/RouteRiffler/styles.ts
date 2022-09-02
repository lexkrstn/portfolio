import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const makeGlobalStyles = (theme: Theme) => css`
  html {
    .scroll-down-enter,
    .scroll-down-exit,
    .scroll-down-enter-active,
    .scroll-down-exit-active,
    .scroll-up-enter,
    .scroll-up-exit,
    .scroll-up-enter-active,
    .scroll-up-exit-active {
      position: absolute;
      top: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      will-change: transform;
      pointer-events: none;
      transform-style: flat;
      backface-visibility: hidden;
    }
    .scroll-down-enter-active,
    .scroll-down-exit-active,
    .scroll-up-enter-active,
    .scroll-up-exit-active {
      transition: transform ${theme.routeRiffleDuration}ms linear;
    }
    .scroll-down-enter {
      transform: translateZ(-50vw) rotateY(90deg) translateZ(50vw);
    }
    .scroll-up-enter {
      transform: translateZ(-50vw) rotateY(-90deg) translateZ(50vw);
    }
    .scroll-down-enter-active,
    .scroll-up-enter-active {
      transform: translateZ(-50vw) rotateY(0deg) translateZ(50vw);
    }
    .scroll-down-exit,
    .scroll-up-exit {
      transform: translateZ(-50vw) rotateY(0deg) translateZ(50vw);
    }
    .scroll-down-exit-active {
      transform: translateZ(-50vw) rotateY(-90deg) translateZ(50vw);
    }
    .scroll-up-exit-active {
      transform: translateZ(-50vw) rotateY(90deg) translateZ(50vw);
    }
  }
`;

export const RouteRiffler = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Cube = styled.div`
  min-height: 100%;
`;
