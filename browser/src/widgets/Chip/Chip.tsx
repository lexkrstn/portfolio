import React, { CSSProperties, FC, MouseEvent, ReactNode } from 'react';
import * as S from './styles';

export interface Props {
  active?: boolean;
  children: ReactNode;
  style?: CSSProperties,
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

const Chip: FC<Props> = ({ children, ...rest }) => (
  <S.Chip {...rest}>
    <S.ChipContent>{children}</S.ChipContent>
  </S.Chip>
);

Chip.defaultProps = {
  active: false,
};

Chip.displayName = 'Chip';

export default Chip;
