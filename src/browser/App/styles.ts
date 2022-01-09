import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const GlobalStyle = css`
  * { box-sizing: border-box; }
  html {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  body {
    margin: 0;
    padding: 0;
    background: #eee;
    min-width: 320px;
    min-height: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    color: #303030;
    line-height: 1.5;
    overflow: hidden;
  }
  #app-slot {
    display: block;
    height: 100%;
  }
`;

export const App = styled.div`
  height: 100%;
`;
