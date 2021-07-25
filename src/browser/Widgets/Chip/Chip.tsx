import React, { MouseEvent, ReactElement, ReactNode } from 'react';
import * as S from './styles';

export interface ChipProps {
  active?: boolean;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

export default function Chip({ children, ...rest }: ChipProps): ReactElement {
  return (
    <S.Chip {...rest}>
      <S.ChipContent>{children}</S.ChipContent>
    </S.Chip>
  );
}
