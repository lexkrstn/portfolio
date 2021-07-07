import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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
      width: 100%;
      min-height: 100vh;
    }
    .scroll-down-enter-active,
    .scroll-down-exit-active,
    .scroll-up-enter-active,
    .scroll-up-exit-active {
      transition: transform .2s;
    }
    .scroll-down-enter {
      transform: translateY(100%);
    }
    .scroll-up-enter {
      transform: translateY(-100%);
    }
    .scroll-down-enter-active,
    .scroll-up-enter-active {
      transform: translateY(0%);
    }
    .scroll-down-exit,
    .scroll-up-exit {
      transform: translateY(0%);
    }
    .scroll-down-exit-active {
      transform: translateY(-100%);
    }
    .scroll-up-exit-active {
      transform: translateY(100%);
    }
  }
`;
