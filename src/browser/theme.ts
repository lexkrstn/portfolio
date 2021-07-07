import { darken } from 'polished';

const baseFontSize: number = 16;
const baseLineHeight: number = 1.5; // 24/16

const headingsFont = '"Montserrat", sans-serif';
const regularFont: string = 'Roboto, sans-serif';

const controlSizes: string[] = ['base', 'xs', 'sm', 'lg', 'xl'];

interface SizeVariantsType {
  [name: string]: number;
}

interface ComputedLineHeightsType {
  [name: string]: string;
}

const controlFontSizes: SizeVariantsType = {
  base: 16,
  lg: 18,
  sm: 14,
  xl: 18,
  xs: 12,
};

const controlHeights: SizeVariantsType = {
  base: 38,
  lg: 48,
  sm: 28,
  xl: 48,
  xs: 20,
};

function computeLineHeights(
  fontSize: SizeVariantsType,
  lineHeight: number,
): ComputedLineHeightsType {
  const computed: ComputedLineHeightsType = {};
  for (const size of Object.keys(fontSize)) {
    computed[size] = Math.floor(fontSize[size] * lineHeight) + 'px';
  }
  return computed;
}

/**
 * Computes vertical padding (from each side) for an element with specified
 * font size and line height so that it should have an indicated height.
 *
 * @param {integer} height Designed height of an element.
 * @param {integer} fontSize Element's font size in px.
 * @param {integer} lineHeight Element's line height factor.
 * @param {integer} borderWidth Element's border width in px.
 * @return {string} Padding size with 'px' appended.
 */
function verticalPadding(
  height: number,
  fontSize: number,
  lineHeight: number,
  borderWidth: number = 0,
): string {
  return ((height - Math.floor(fontSize * lineHeight)) / 2 - borderWidth) + 'px';
}

const theme = {
  bp: {
    lg: '1200px',
    md: '960px',
    sm: '600px',
    xl: '1860px',
  },
  color: {
    brand: {
      facebook:   '#3b5998',
      github:     '#4078c0',
      gplus:      '#dd4b39',
      twitter:    '#1da1f2',
      vk:         '#45668e',
    },
    lines:        '#e0e0e0',
    link:         '#337ab7',
    linkHover:    '#23527c',
    linkVisited:  '#337ab7',
    muted:        '#666',
    text:         '#303030',
  },
  container: {
    margin: 15,
    maxWidth: 1170,
  },
  control: {
    border: {
      radius: {
        base:  4,
        lg: 4,
        sm: 4,
        xl: 4,
        xs: 4,
      },
    },
    computedLineHeight: computeLineHeights(controlFontSizes, baseLineHeight),
    font: {
      size: controlFontSizes,
    },
    height: controlHeights,
    padding: {
      vertical: controlSizes.reduce((accumulator, size) => ({
        ...accumulator,
        [size]: verticalPadding(
          controlHeights[size],
          controlFontSizes[size],
          baseLineHeight,
          1,
        ),
      }), {}),
    },
    sizes: controlSizes,
  },
  font: {
    family: {
      base: regularFont,
      captions: regularFont,
      headings: headingsFont,
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
    computed: Math.floor(baseLineHeight * baseFontSize),
    h1: Math.floor(baseLineHeight * baseFontSize * 1.5),
    h2: Math.floor(baseLineHeight * baseFontSize * 1.25),
    h3: Math.floor(baseLineHeight * baseFontSize * 1.125),
    h4: Math.floor(baseLineHeight * baseFontSize),
  },
  navbar: {
    bg: '#4c7eb3',
    height: '52px',
    lg: '780px',
  },
  paneShadow: '0px 3px 5px 0 rgba(174,174,174,0.5)',
  state: {
    bg: {
      danger:  '#b34c4c',
      info:    '#4c7eb3',
      success: '#7bc144',
      warning: '#b3984c',
    },
    border: {
      danger:  darken(0.1, '#b34c4c'),
      info:    darken(0.1, '#4c7eb3'),
      success: darken(0.1, '#7bc144'),
      warning: darken(0.1, '#b3984c'),
    },
    contrastText: {
      danger:  '#fff',
      info:    '#fff',
      success: '#fff',
      warning: '#fff',
    },
    text: {
      danger:  '#f74040',
      info:    '#31708f',
      success: '#5ab336',
      warning: '#8a6d3b',
    },
  },
  zindex: {
    dropdown:          1000,
    dropdownNav:       1080,
    mobileMenu:        1090,
    modal:             1050,
    modalBackground:   1040,
    navbar:            1000,
    navbarFixed:       1030,
    popover:           1060,
    tooltip:           1070,
  },
};

export default theme;
export type Theme = typeof theme;
