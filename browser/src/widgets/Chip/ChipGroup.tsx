import React, { ReactElement, ReactNode } from 'react';
import * as S from './styles';

export interface ChipGroupProps {
  children: ReactNode;
}

export default function ChipGroup(props: ChipGroupProps): ReactElement {
  return <S.ChipGroup {...props} />;
}
