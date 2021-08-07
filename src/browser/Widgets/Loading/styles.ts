import styled, { css, keyframes } from "styled-components";

const fade = keyframes`
  from { opacity: .5; }
  to { opacity: 1; }
`;

interface LoadingProps {
  aspect: number;
  height: number;
}

export const Loading = styled.div<LoadingProps>`
  position: relative;
  font-weight: 400;
  white-space: nowrap;
  line-height: 1;
  font-size: 0;
  text-align: center;

  ${props => !props.height ? '' : css`
    height: ${props.height}px;
  `};

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
`;

export const Content = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 5px 0;
  position: relative;
  text-align: center;
`;

export const RingBox = styled.div`
  position: relative;
  z-index: 2;
  line-height: 1;
  font-size: 0;
`;

export const RingBack = styled.div`
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 0;
  right: 0;
  line-height: 1;
  font-size: 0;
  opacity: .3;
`;

export const Percent = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  text-align: center;
  white-space: nowrap;
  font-size: 13px;

  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
`;

export const Legend = styled.div`
  margin-top: 7px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 13px;
  line-height: 1;
  animation: 1s linear infinite alternate ${fade};
`;
