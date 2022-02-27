import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const blinking = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Typewriter = styled.div<{ fontSize: string }>`
  font-size: ${props => props.fontSize || 'inherit'};
`;

export const Caret = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background: currentColor;
  vertical-align: middle;
  margin-left: 0.15em;
  animation: ${blinking} .6s infinite alternate ease-in-out;
`;
