import { css, ThemeProps } from 'styled-components';
import { Theme } from '../theme';

export const containerWrapMixin = (props: ThemeProps<Theme>) => css`
  padding-left: ${props.theme.container.margin}px;
  padding-right: ${props.theme.container.margin}px;
`;

export const containerMixin = (props: ThemeProps<Theme>) => css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${props.theme.container.maxWidth}px;
`;
