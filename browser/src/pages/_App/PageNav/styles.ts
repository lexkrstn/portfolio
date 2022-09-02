import styled from '@emotion/styled';

export const PageNav = styled.div`
  display: none;
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 15px;
  transform: translate3d(0, -50%, 0);
  padding: 7px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .13);

  @media (min-width: 800px) {
    display: block;
  }
`;

export const PageButton = styled.div`
  width: 10px;
  height: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  &:last-child { margin-bottom: 0; }
`;

export const PageCircle = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  transition: background-color 150ms ease-in;
  background-color: ${({ active }) => active ? '#fff' : 'transparent'};
  &:hover {
    transition-function: ease-out;
    background-color: rgba(255, 255, 255, .5);
  }
`;
