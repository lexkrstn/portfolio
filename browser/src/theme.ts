import { createTheme, Theme as MuiTheme } from '@mui/material';

export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type BreakpointType = typeof BREAKPOINTS[number];
export type GridType = 'inline' | 'float' | 'flex';
export type TextSize = 'base' | 'h1' | 'h2' | 'h3' | 'h4';

interface MyTheme {
  bp: Record<BreakpointType, string>;
  container: {
    margin: number;
    maxWidth: number;
  };
  font: {
    family: {
      regular: string;
      caption: string;
      heading: string;
    };
    size: Record<TextSize, number>;
  };
  lineHeight: Record<TextSize, number>;
}

declare module '@emotion/react' {
  interface Theme extends MyTheme {}
}

declare module '@mui/material/styles' {
  interface Theme extends MyTheme {}
  interface ThemeOptions extends Partial<Theme> {}
}

const regularFont = '"Roboto", sans-serif';
const baseFontSize = 16;
const baseLineHeight = 1.5;

const myTheme: MyTheme = {
  bp: {
    lg: '1200px',
    md: '960px',
    sm: '600px',
    xl: '1860px',
    xs: '0px',
  },
  container: {
    margin: 15,
    maxWidth: 1170,
  },
  font: {
    family: {
      regular: regularFont,
      caption: regularFont,
      heading: regularFont,
    },
    size: {
      base: baseFontSize,
      h1: Math.round(baseFontSize * 1.5),
      h2: Math.round(baseFontSize * 1.25),
      h3: Math.round(baseFontSize * 1.125),
      h4: baseFontSize,
    },
  },
  lineHeight: {
    base: baseLineHeight,
    h1: baseLineHeight,
    h2: baseLineHeight,
    h3: baseLineHeight,
    h4: baseLineHeight,
  },
};

export default createTheme({
  ...myTheme,
  palette: {
    mode: 'dark',
  },
});
