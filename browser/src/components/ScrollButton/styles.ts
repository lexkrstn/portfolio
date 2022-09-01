import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const ScrollAnimation = keyframes`
  0% { transform: translate(0, 0); opacity: 0; }
  40% { opacity: 1; }
  80% { transform: translate(0, calc(var(--height) * 0.7)); opacity: 0; }
  100% { opacity: 0; }
`;

export const ScrollButton = styled.button`
  --size: 0.9;
  --size: 0.9;
  --color: rgba(255, 255, 255, 0.75);
  --opacity: 1;
  --width: calc(26px * var(--size));
  --height: calc(var(--width) * 2);
  --ballSize: calc(var(--width) / 4);
  border: none;
  display: block;
  background: transparent;
  cursor: default;
  opacity: var(--opacity);
  z-index: 1001;
  transition: opacity 0.165s ease-out, transform 0.165s ease-out;
  position: relative;
`;

export const Box = styled.div`
  display: block;
  width: var(--width);
  height: var(--height);
  border: calc(2px * var(--size)) solid var(--color);
  border-radius: calc(var(--width) / 2);

  &::before {
    content: ' ';
    width: var(--ballSize);
    height: var(--ballSize);
    border-radius: 50%;
    background-color: var(--color);
    position: absolute;
    top: calc(var(--height) * 0.1);
    left: calc(50% - var(--ballSize) / 2);
    animation: ${ScrollAnimation} 1s infinite;
  }
`;
