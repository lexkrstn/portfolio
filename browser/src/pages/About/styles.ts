import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { containerMixin, containerWrapMixin } from '../../components/mixins';

export const About = styled.div`
  ${containerWrapMixin}
  position: relative;
  min-height: 100vh;
`;

export const Container = styled.div`
  ${containerMixin}
  padding: 65px 0 50px;
  color: white;
  transform: translate3d(0, 0, 0);
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

export const Placeholder = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
