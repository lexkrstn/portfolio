import styled from 'styled-components';
import { GradientBackground } from '../../widgets/GradientBackground/styles';
import { containerMixin, containerWrapMixin } from '../../widgets/mixins';

export const Work = styled.div`
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

export const Box = styled.div`
  margin: 10px 0;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.15);
`;

export const Title = styled.h1`
  margin: 15px 0 20px;
  font-size: 2em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

export const Brief = styled.p`
  margin: 0 0 15px;
  font-size: 1.3em;
  font-weight: 300;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  text-indent: 2em;
  text-align: justify;

  &:last-child { margin-bottom: 0 }
`;

export const Section = styled.section`
  margin: 30px 0;
`;

export const Heading = styled.h2`
  margin: 0 0 15px;
  font-size: 1.25em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

export const Divider = styled.div`
  margin: 15px auto 25px;
  height: 0;
  border-bottom: 1px solid rgba(255,255,255,.5);
  width: 50%;
`;

export const Para = styled.p`
  margin: 0 0 15px;
  font-weight: 300;
  font-size: 20px;
  text-indent: 2em;
  text-align: justify;

  &:last-child { margin-bottom: 0; }
`;

export const Subheading = styled(Para)`
  text-align: center;
  text-indent: 0;
`;

export const List = styled.ul`
  margin: 0 0 15px;
  padding: 0 0 0 4em;
  font-size: 20px;
  font-weight: 300;
  list-style: none;

  &:last-child { margin-bottom: 0; }
`;

export const Item = styled.li`
  margin: 0 0 15px;
  padding: 0;
  display: block;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: .5em;
    height: .5em;
    border: 1px solid currentColor;
    border-radius: 50%;
    position: absolute;
    left: -2em;
    top: .4em;
  }

  &:last-child { margin-bottom: 0; }
`;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
  text-transform: lowercase;
  font-weight: 500;
`;
