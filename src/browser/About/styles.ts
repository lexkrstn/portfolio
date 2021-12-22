import styled, { css } from 'styled-components';
import { GradientBackground } from '../widgets/GradientBackground/styles';
import { containerMixin, containerWrapMixin } from '../widgets/mixins';

export const About = styled.div`
  ${containerWrapMixin}
  position: relative;
  min-height: 100vh;

  ${GradientBackground} {
    position: fixed; // to look good in overscroll effect
  }
`;

export const Container = styled.div`
  ${containerMixin}
  padding: 65px 0 50px;
  color: white;
`;

export const Title = styled.h1`
  margin: 15px 0 20px;
  font-size: 2em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);

  ${props => css`
    @media screen and (min-width: ${props.theme.bp.lg}) {
      text-align: left;
    }
  `}
`;

export const PhotoAndName = styled.div`
  display: flex;
  align-items: center;
`;

export const Photo = styled.div`
  flex: 0 0 auto;
  width: 200px;
  overflow: hidden;
  border-radius: 4px;
  background-color: rgba(255,255,255,.2);
  transition: filter .4s ease;

  &:hover {
    filter: grayscale(1);
  }
`;

export const Name = styled.h2`
  flex: 1 1 auto;
  margin: 0 0 0 25px;
  padding: 0;
  font-size: 24px;
  font-weight: 400;
  text-align: left;
  text-transform: uppercase;
`;

export const Section = styled.section`
  margin: 40px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Heading = styled.h3`
  margin: 0 0 35px;
  font-size: 1.25em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

export const SubHeading = styled.h4`
  margin: 35px 0;
  font-size: 1em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

export const Para = styled.p`
  margin: 0 0 15px;
  font-weight: 300;
  font-size: 20px;
  text-indent: 0;
  text-align: justify;

  &:last-child { margin-bottom: 0; }
`;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
  text-transform: lowercase;
  font-weight: 500;
  display: inline;
  border-bottom: 1px solid currentColor;
  transition: border-color .15s ease;

  &:hover {
    border-color: transparent;
  }
`;

export const CharSheet = styled.div`
  margin: 0 0 15px;
  font-size: 20px;
  font-weight: 300;
  background: rgba(0,0,0,.2);
  padding: 10px 15px;
  border-radius: 4px;
  box-shadow: 6px 6px 0px -2px rgba(0,0,0,.1);

  &:last-child { margin-bottom: 0; }
`;

export const Attribute = styled.dl`
  display: flex;
  margin: 0 0 8px;
  padding: 0 0 8px;
  border-bottom: 1px solid rgba(0,0,0,.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const AttributeName = styled.dt`
  flex: 0 1 auto;
  display: block;
  text-align: left;
`;

export const AttributeValue = styled.dd`
  flex: 1 1 auto;
  display: block;
  text-align: right;

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color .15s ease;

    &:hover {
      border-bottom-color: currentColor;
    }
  }
`;

export const Placeholder = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
