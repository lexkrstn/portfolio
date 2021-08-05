import { ExternalLinkAlt } from '@styled-icons/fa-solid';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Chip, ChipGroup } from '../../widgets/Chip/styles';

export const Card = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: inherit;
  position: relative;
  border-radius: 4px;
  box-shadow: 9px 9px 0 rgba(0, 0, 0, 0.25);
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 11px 11px 0 rgba(0, 0, 0, 0.15);
  }
`;

export const Caption = styled.div`
  padding: 0 10px 0 60px;
  height: 32px;
  line-height: 32px;
  background-color: rgba(50, 50, 50, 0.84);
  border-radius: 4px 4px 0 0;
`;

export const CaptionButtons = styled.div`
  width: 40px;
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
`;

export const CaptionButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  background-image: radial-gradient(#fff, #ddd);

  & + & {
    margin-left: 5px;
  }
`;

export const Title = styled.span`
  display: block;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  text-indent: -30px;
`;

export const Content = styled.div`
  position: relative;
  border-radius: 0 0 4px 4px;
  line-height: 0;
`;

export const Overlay = styled.div`
  opacity: 0;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 0 0 4px 4px;
  background-color: rgba(19, 19, 19, 0.68);
  background-image: radial-gradient(rgba(0, 0, 0, 0.27), rgba(255, 255, 255, 0.33));
  transition: opacity 0.2s ease-in-out;
  user-select: none;

  ${Card}:hover & {
    opacity: 1;
  }

  ${ChipGroup} {
    text-align: center;
  }
`;

export const Cover = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  border-radius: 0 0 4px 4px;

  ${Card}:hover & {
    filter: blur(7px);
    transition: filter 0.2s ease;
  }
`;

export const Button = styled(Chip)`
  margin-top: 15px;
  padding: 6px 30px;
  border-radius: 100px;
`;

export const ButtonLinkIcon = styled(ExternalLinkAlt)`
  width: 1em;
  height: 1em;
  margin-left: 0.5em;
`;
