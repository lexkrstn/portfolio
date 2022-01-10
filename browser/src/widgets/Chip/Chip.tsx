import React, {
  CSSProperties, MouseEvent, ReactElement, ReactNode,
} from 'react';
import * as S from './styles';

export interface ChipProps {
  active?: boolean;
  children: ReactNode;
  style?: CSSProperties,
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

export default function Chip({ children, ...rest }: ChipProps): ReactElement {
  return (
    <S.Chip {...rest}>
      <S.ChipContent>{children}</S.ChipContent>
    </S.Chip>
  );
}

Chip.defaultProps = {
  active: false,
};
