import React, { ReactElement, useMemo } from 'react';
import { Global, useTheme } from '@emotion/react';
import { makeGlobalStyles } from './styles';

export default function GlobalStyles(): ReactElement {
  const theme = useTheme();
  const styles = useMemo(() => makeGlobalStyles(theme), []);
  return <Global styles={styles} />;
}
