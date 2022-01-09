import styled from '@emotion/styled';
import { GradientBackground } from '../widgets/GradientBackground/styles';
import { containerMixin, containerWrapMixin } from '../widgets/mixins';
import { Card } from './Card/styles';

export const Portfolio = styled.div`
  ${containerWrapMixin}
  position: relative;
  min-height: 100vh;

  ${GradientBackground} {
    position: fixed; // to look good in overscroll effect
  }

  .item-enter ${Card} {
    transform: scale(0.2);
  }
  .item-enter-active ${Card} {
    transform: scale(1);
    transition: transform 300ms ease-in;
  }
  .item-exit ${Card} {
    transform: scale(1);
  }
  .item-exit-active ${Card} {
    transform: scale(0.2);
    transition: transform 300ms ease-in;
  }
`;

export const Container = styled.div`
  ${containerMixin}
  padding: 65px 0 50px;
  color: white;
`;

export const Heading = styled.h1`
  margin: 15px 0 20px;
  font-size: 2em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

export const Subheading = styled.h2`
  margin: 0 0 15px;
  font-size: 1.3em;
  font-weight: 300;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);

  &:last-child { margin-bottom: 0 }
`;

export const ResultSummary = styled.p`
  margin: 35px 0 25px;
  font-weight: 300;

  &:last-child { margin-bottom: 0 }

  & > b {
    font-weight: 400;
  }
`;

export const Placeholder = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
