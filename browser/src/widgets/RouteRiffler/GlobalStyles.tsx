import React, { FC, useMemo } from 'react';
import { Global, useTheme } from '@emotion/react';
import { makeGlobalStyles } from './styles';

const GlobalStyles: FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeGlobalStyles(theme), []);
  return <Global styles={styles} />;
};

GlobalStyles.displayName = 'GlobalStyles';

export default GlobalStyles;
