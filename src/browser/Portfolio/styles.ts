import styled from 'styled-components';
import { containerMixin, containerWrapMixin } from '../Widgets/mixins';

export const Portfolio = styled.div`
  ${containerWrapMixin}
  position: relative;
  min-height: 100vh;
  background: rgb(65, 88, 180);
`;

export const Container = styled.div`
  ${containerMixin}
`;
