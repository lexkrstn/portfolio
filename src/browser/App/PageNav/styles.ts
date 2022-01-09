import styled from '@emotion/styled';

export const PageNav = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  padding: 7px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .13);
`;

export const PageButton = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background-color 150ms ease-in;
  background-color: ${({ active }) => active ? '#fff' : 'transparent'};

  &:last-child { margin-bottom: 0; }

  &:hover {
    transition-function: ease-out;
    background-color: rgba(255, 255, 255, .5);
  }
`;
