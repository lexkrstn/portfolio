import styled from 'styled-components';
import { containerMixin, containerWrapMixin } from '../widgets/mixins';

export const About = styled.div`
  ${containerWrapMixin}
  position: relative;
  min-height: 100vh;
`;

export const Container = styled.div`
  ${containerMixin}
`;
