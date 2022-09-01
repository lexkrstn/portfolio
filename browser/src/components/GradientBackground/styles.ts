import styled from '@emotion/styled';

export const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: rgb(65, 88, 180);
  background-image:
    radial-gradient(ellipse at top, #e66465, transparent),
    radial-gradient(ellipse at bottom, #4d9f0c, transparent);
`;
