import React, { ReactElement } from 'react';
import ProgressRing from '../ProgressRing';
import * as S from './styles';

interface LoadingProps {
  aspect?: number;
  height?: number;
  progress?: number;
}

export default function Loading({ aspect, height, progress = 100 }: LoadingProps): ReactElement {
  return (
    <S.Loading height={height || 0} aspect={aspect}>
      <S.Content>
        <S.RingBack>
          <ProgressRing size={46} stroke={2} progress={100} />
        </S.RingBack>
        <S.RingBox>
          <ProgressRing size={46} stroke={2} progress={progress} />
          <S.Percent>{Math.round(progress)}%</S.Percent>
        </S.RingBox>
        <S.Legend>Loading...</S.Legend>
      </S.Content>
    </S.Loading>
  );
}
