import styled from '@emotion/styled';

export const Video = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  padding-top: 70px;
  height: 0;
  pointer-events: none;
`;

export const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
