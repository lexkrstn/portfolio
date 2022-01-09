import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Loading } from '../Loading/styles';

export const Image = styled.div<{ aspect?: number }>`
  position: relative;
  max-width: 100%;
  line-height: 0;
  font-size: 0;
  white-space: nowrap;

  ${props => !props.aspect ? '' : css`
    &::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 0;
      padding-top: calc(100% / ${props.aspect});
    }
  `}

  ${Loading} {
    display: inline-block;
    width: 100%;
  }
`;

export const Frame = styled.div<{ aspect?: number }>`
  ${props => !props.aspect ? '' : css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `}
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
