import React, { FC, ReactNode } from 'react';
import * as S from './styles';

export interface Props {
  children: ReactNode;
}

const ChipGroup: FC<Props> = props => <S.ChipGroup {...props} />;

ChipGroup.displayName = 'ChipGroup';

export default ChipGroup;
