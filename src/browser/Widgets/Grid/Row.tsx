import styled, { css, ThemeProps, DefaultTheme } from 'styled-components';

const inlineGridRowMixin = css`
  font-size: 0;
  line-height: 0;
`;

const floatGridRowMixin = css`
  &:after {
    content: '';
    display: table;
    clear: both;
  }
`;

const flexGridRowMixin = css`
  display: flex;
  flex-wrap: wrap;
`;

export type RowProps = ThemeProps<DefaultTheme>;

export const Row = styled.div<RowProps>`
  ${props => props.theme.grid.type === 'inline' && inlineGridRowMixin}
  ${props => props.theme.grid.type === 'float' && floatGridRowMixin}
  ${props => props.theme.grid.type === 'flex' && flexGridRowMixin}

  margin-left: -${props => props.theme.grid.gutterX};
  margin-top: -${props => props.theme.grid.gutterY};
`;
