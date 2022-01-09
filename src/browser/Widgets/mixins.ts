import { css, Theme } from '@emotion/react';

interface ThemeProps<T> {
  theme: T;
}

export const containerWrapMixin = (props: ThemeProps<Theme>) => css`
  padding-left: ${props.theme.container.margin}px;
  padding-right: ${props.theme.container.margin}px;
`;

export const containerMixin = (props: ThemeProps<Theme>) => css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${props.theme.container.maxWidth}px;
`;
