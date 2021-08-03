import { css, DefaultTheme, ThemeProps } from 'styled-components';

export const containerWrapMixin = (props: ThemeProps<DefaultTheme>) => css`
  padding-left: ${props.theme.container.margin}px;
  padding-right: ${props.theme.container.margin}px;
`;

export const containerMixin = (props: ThemeProps<DefaultTheme>) => css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${props.theme.container.maxWidth}px;
`;
