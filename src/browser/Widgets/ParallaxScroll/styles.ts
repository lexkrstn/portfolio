import styled from 'styled-components';

export const ParallaxScroll = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const Scroller = styled.div`
  height: 100%;
  margin-right: -100px;
  overflow-y: scroll;
`;

export const Expander = styled.div`
  height: 200%;
  z-index: 2;
  position: relative;
`;

export const Content = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 100px;
  bottom: 0;
  z-index: 1;
`;
