import styled, { keyframes } from 'styled-components';

const AppearAnimation = keyframes`
  from { transform: translateZ(-800px); }
  to { transform: translateZ(0px); }
`;

export const TextFrame = styled.div`
  width: 100%;
  height: 100%;
  perspective: 800px;
`;

export const Svg = styled.svg`
  width: 100%;
  height: 100%;
  animation: ${AppearAnimation} 1s ease-out alternate infinite;
`;

export const Text = styled.text`
  font-size: 100px;
  stroke: #fff;
  stroke-width: 2px;
  fill: transparent;
`;
