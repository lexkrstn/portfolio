import React, { ReactElement, ReactNode, useMemo } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import defaultTheme, { GridType } from '../../theme';

export interface GridThemeProps {
  children: ReactNode;
  gutterX?: string;
  gutterY?: string;
  type?: GridType;
}

export function GridTheme({ children, ...rest }: GridThemeProps): ReactElement {
  const theme = useMemo(
    (): DefaultTheme => ({
      ...defaultTheme,
      grid: {
        ...defaultTheme.grid,
        ...rest,
      },
    }),
    Array.from(Object.values(rest))
  );
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
