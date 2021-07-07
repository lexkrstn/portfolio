import styled, { keyframes } from 'styled-components';
import { containerWrapMixin } from '../Widgets/mixins';
import { ScrollButton } from '../Widgets/ScrollButton/styles';

export const BackgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Home = styled.div`
  ${containerWrapMixin}
  position: relative;
  height: 100vh;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #49c870);
  background-size: 400% 400%;
  animation: ${BackgroundAnimation} 60s ease infinite;

  ${ScrollButton} {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: transitionX(-50%);
  }
`;

export const Container = styled.div`
  padding: 116px 35px 96px 57px;
  height: 100%;
`;
