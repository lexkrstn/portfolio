import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Position = 'top' | 'right' | 'bottom' | 'left';

const bg = 'rgba(0, 0, 0, .67)';
const nib = 6; // pixels

export const Tooltip = styled.div<{ inline?: boolean }>`
  display: ${({ inline }) => inline ? 'inline-block' : 'block'};
`;

export const Message = styled.div<{ shown?: boolean, position?: Position, offset?: number }>`
  position: absolute;
  z-index: 999;
  background: ${bg};
  opacity: 0.8;
  display: ${({ shown }) => shown ? 'block' : 'none'};
  font-size: 14px;
  line-height: 1.3em;
  min-width: 50px;
  max-width: 400px;
  padding: 7px;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
  border-radius: 2px;

  ${({ position, offset }) => position === 'top' && css`
    transform: translate(-50%, -100%);
    margin-top: -${offset}px;
  `}

  ${({ position, offset }) => position === 'bottom' && css`
    transform: translateX(-50%);
    margin-top: ${offset}px;
  `}

  ${({ position, offset }) => position === 'left' && css`
    transform: translate(-100%, -50%);
    margin-left: -${offset}px;
  `}

  ${({ position, offset }) => position === 'right' && css`
    transform: translateY(-50%);
    margin-left: ${offset}px;
  `}

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border: ${nib}px solid transparent;

    ${({ position }) => position === 'top' && css`
      left: 50%;
      bottom: ${-2 * nib}px;
      margin-left: ${-nib}px;
      border-top-color: ${bg};
    `}

    ${({ position }) => position === 'bottom' && css`
      left: 50%;
      top: ${-2 * nib}px;
      margin-left: ${-nib}px;
      border-bottom-color: ${bg};
    `}

    ${({ position }) => position === 'right' && css`
      left: ${-2 * nib}px;
      top: 50%;
      margin-top: ${-nib}px;
      border-right-color: ${bg};
    `}

    ${({ position }) => position === 'left' && css`
      right: ${-2 * nib}px;
      top: 50%;
      margin-top: ${-nib}px;
      border-left-color: ${bg};
    `}
  }
`;
