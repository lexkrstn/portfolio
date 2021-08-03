import { DefaultTheme } from 'styled-components';

export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type BreakpointType = typeof BREAKPOINTS[number];
export type GridType = 'inline' | 'float' | 'flex';

declare module "styled-components" {
  export interface DefaultTheme {
    bp: { [T in BreakpointType]: string };
    container: {
      margin: number;
      maxWidth: number;
    };
    font: {
      family: {
        base: string;
        captions: string;
        headings: string;
      };
      size: {
        base: number;
        h1: number;
        h2: number;
        h3: number;
        h4: number;
      };
    };
    grid: {
      type: GridType;
      gutterX: string;
      gutterY: string;
    },
    lineHeight: {
      base: number;
      h1: number;
      h2: number;
      h3: number;
      h4: number;
    };
    zindex: {
      dropdown: number;
      mobileMenu: number;
      modal: number;
      modalBackground: number;
      navbar: number;
      navbarFixed: number;
      popover: number;
      tooltip: number;
    },
  }
}

const regularFont = '"Roboto", sans-serif';
const baseFontSize = 16;
const baseLineHeight = 1.5;

const defaultTheme: DefaultTheme = {
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
      base: regularFont,
      captions: regularFont,
      headings: regularFont,
    },
    size: {
      base: baseFontSize,
      h1: Math.round(baseFontSize * 1.5),
      h2: Math.round(baseFontSize * 1.25),
      h3: Math.round(baseFontSize * 1.125),
      h4: baseFontSize,
    },
  },
  grid: {
    type: 'flex',
    gutterX: '15px',
    gutterY: '15px',
  },
  lineHeight: {
    base: baseLineHeight,
    h1: baseLineHeight,
    h2: baseLineHeight,
    h3: baseLineHeight,
    h4: baseLineHeight,
  },
  zindex: {
    dropdown:          1000,
    mobileMenu:        1090,
    modal:             1050,
    modalBackground:   1040,
    navbar:            1000,
    navbarFixed:       1030,
    popover:           1060,
    tooltip:           1070,
  },
};

export default defaultTheme;
