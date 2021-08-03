import styled, { css, DefaultTheme, FlattenSimpleInterpolation, ThemeProps } from 'styled-components';
import { BREAKPOINTS, BreakpointType } from '../../theme';

const EPSILON = 0.00000001;

type BreakpointProps = { [K in BreakpointType]: number | { offset?: number, width?: number } };
type ColProps = ThemeProps<DefaultTheme> & Partial<BreakpointProps>;

const inlineColumnMixin = css`
  display: inline-block;
  vertical-align: top;
  font-size: ${props => props.theme.font.size.base}px;
  line-height: ${props => props.theme.lineHeight.base};
`;

const floatColumnMixin = css`float: left;`;

function makeWidth(width: number) {
	return css`width: ${width * 100 - EPSILON}\%;`;
}

function makeOffset(offset: number) {
	return css`margin-left: ${offset * 100 - EPSILON}\%;`;
}

function columnSizeAtBreakpoint(props: ColProps, bp: BreakpointType): FlattenSimpleInterpolation {
	let width = props[bp];
	let offset = 0;
	if (typeof width === 'object') {
		offset = width.offset;
		width = width.width;
	}
	return css`
		${!!width && makeWidth(width)}
		${!!offset && makeOffset(offset)}
	`;
}

function makeBreakpoints(props: ColProps): FlattenSimpleInterpolation {
  const all: FlattenSimpleInterpolation[] = [];
  for (let i = 0; i < BREAKPOINTS.length; i++) {
    const bp = BREAKPOINTS[i];
    if (props[bp] && i === 0) {
      all.push(columnSizeAtBreakpoint(props, bp));
    } else if (props[bp]) {
      all.push(css`
        @media screen and (min-width: ${props.theme.bp[bp]}) {
          ${columnSizeAtBreakpoint(props, bp)}
        }
      `);
    }
  }
	return all;
}

export const Col = styled.div<ColProps>`
  width: 100%;
  padding-left: ${props => props.theme.grid.gutterX};
  margin-top: ${props => props.theme.grid.gutterY};

  ${props => props.theme.grid.type === 'inline' && inlineColumnMixin}
  ${props => props.theme.grid.type === 'float' && floatColumnMixin}

  ${makeBreakpoints}
`;
