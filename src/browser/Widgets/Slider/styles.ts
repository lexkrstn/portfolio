import styled, { css, DefaultTheme } from 'styled-components';

export const Slider = styled.div`
  position: relative;
`;

export const Frame = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
`;

const directionAreaMixin = css`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 30%;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  color: rgba(255,255,255,.6);
  opacity: 0;
  transition: opacity .2s ease;
  user-select: none;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 20px;
  }
`;

export const LeftArea = styled.div`
  ${directionAreaMixin}
  left: 0;
  background-image: linear-gradient(to right, rgba(0,0,0,.4), rgba(0,0,0,0));
  justify-content: flex-start;
  padding-left: 40px;
`;

export const RightArea = styled.div`
  ${directionAreaMixin}
  right: 0;
  background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,.4));
  justify-content: flex-end;
  padding-right: 40px;
`;

export const Slide = styled.div`
  flex: 1 0 auto;
  width: 100%;
  line-height: 1;
  font-size: 0;
  background-color: rgba(0, 0, 0, .2);

  & > * {
    max-width: 100%;
    line-height: ${props => props.theme.lineHeight.base};
    font-size: ${props => props.theme.font.size.base}px;
  }

  &.slide-right-exit, &.slide-right-enter {
    transform: translateX(0);
  }
  &.slide-left-exit, &.slide-left-enter {
    transform: translateX(-100%);
  }
  &.slide-right-exit-active, &.slide-right-enter-active,
  &.slide-left-exit-active, &.slide-left-enter-active {
    transition: transform .3s linear;
  }
  &.slide-right-exit-active, &.slide-right-enter-active {
    transform: translateX(-100%);
  }
  &.slide-left-exit-active, &.slide-left-enter-active {
    transform: translateX(0);
  }
  &.slide-right-exit, &.slide-right-exit-active,
  &.slide-left-enter, &.slide-left-enter-active {
    order: 1;
  }
  &.slide-right-enter, &.slide-right-enter-active,
  &.slide-left-exit, &.slide-left-exit-active {
    order: 2;
  }
`;

export const Pills = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0 0;
  font-size: 0;
  line-height: 16px;
  text-align: center;
  user-select: none;
`;

interface PillProps {
  active?: boolean;
}

export const Pill = styled.li<PillProps>`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  margin: 0 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  transition: box-shadow .2s ease, background-color .2s ease, width .2s ease, height .2s ease;

  &::before {
    content: '';
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -5px;
    left: -5px;
  }

  &:hover {
    box-shadow: 0 0 0 4px rgba(255, 255, 255, .15);
  }

  ${props => !props.active ? '' : css`
    width: 16px;
    height: 16px;
    background-color: rgba(255, 255, 255, 0.5);

    &:hover {
      box-shadow: none;

      &::before { content: none; }
    }
  `}
`;
