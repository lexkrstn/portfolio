import React, { ReactElement, useMemo } from 'react';
import * as S from './styles';

export interface RingSpinnerProps {
  color?: string;
  size?: string;
  thickness?: string;
}

export default function RingSpinner({ size, color, thickness }: RingSpinnerProps): ReactElement {
  const hostStyle = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );
  const ringStyle = useMemo(
    () => ({
      borderTopColor: color,
      borderWidth: thickness,
    }),
    [color, thickness],
  );
  return (
    <S.RingSpinner style={hostStyle}>
      <S.Ring style={ringStyle} />
      <S.Ring style={ringStyle} />
      <S.Ring style={ringStyle} />
      <S.Ring style={ringStyle} />
    </S.RingSpinner>
  );
}

RingSpinner.defaultProps = {
  color: '#fff',
  thickness: '0.125em',
  size: '1em',
};
