import styled, { css } from 'styled-components';

interface ChipProps {
  active?: boolean;
}

export const Chip = styled.span<ChipProps>`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  line-height: 20px;
  max-width: 100%;
  outline: none;
  padding: 0 12px;
  text-decoration: none;
  transition-duration: .28s;
  transition-property: box-shadow, background-color;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  vertical-align: middle;
  white-space: nowrap;
  background: rgba(255,255,255,0.1);
  border-radius: 5px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 1px 1px 0px 0px rgba(0,0,0,0.1);
  user-select: none;

  &:hover {
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);
    background: rgba(255,255,255,0.2);
  }

  ${props => props.active && css`
    background: #fff;
    color: #000;
    mix-blend-mode: color-dodge;
    transition-property: box-shadow, background-color, color;

    &:hover { background: rgba(255, 255, 255, 0.9); }
  `}
`;

export const ChipContent = styled.span`
  align-items: center;
  display: inline-flex;
  height: 100%;
  max-width: 100%;
`;

export const ChipGroup = styled.div`
  margin: -8px 0 15px -8px;

  ${Chip} {
    margin: 8px 0 0 8px;
  }
`;
