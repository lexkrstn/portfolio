import React, { FC, useMemo } from 'react';
import * as S from './styles';

export interface Props {
  color?: string;
  size?: string;
  thickness?: string;
}

const RingSpinner: FC<Props> = ({ size, color, thickness }) => {
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
};

RingSpinner.defaultProps = {
  color: '#fff',
  thickness: '0.125em',
  size: '1em',
};

RingSpinner.displayName = 'RingSpinner';

export default RingSpinner;
