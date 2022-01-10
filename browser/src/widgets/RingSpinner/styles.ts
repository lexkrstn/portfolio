import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const rotate360 = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const RingSpinner = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
`;

export const Ring = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 10px solid #fff;
  border-color: #fff transparent transparent transparent;
  animation: ${rotate360} 1.5s cubic-bezier(0.5,0,0.5,1) infinite;

  &:nth-child(2) { animation-delay: .185s; }
  &:nth-child(3) { animation-delay: .375s; }
  &:nth-child(4) { animation-delay: .555s; }
`;
