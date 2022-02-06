import React, { ReactElement, ReactChild } from 'react';
import * as S from './styles';

interface DrawerProps {
  open: 'left' | 'right' | false;
  children: ReactChild;
  leftMenu?: ReactChild;
  rightMenu?: ReactChild;
  onClose: () => void;
}

/**
 * The main navigation drawer for mobile menu.
 */
export default function MobileDrawer({
  children, open, leftMenu, rightMenu, onClose,
}: DrawerProps): ReactElement {
  const classes: string[] = [];
  if (open !== false) {
    classes.push('open', open);
  }
  return (
    <S.MobileDrawer className={classes.join(' ')}>
      {!!leftMenu && <S.LeftDrawer>{leftMenu}</S.LeftDrawer>}
      {!!rightMenu && <S.RightDrawer>{rightMenu}</S.RightDrawer>}
      <S.ContentWrap>{children}</S.ContentWrap>
      <S.Backdrop onClick={onClose} />
    </S.MobileDrawer>
  );
}

MobileDrawer.defaultProps = {
  leftMenu: null,
  rightMenu: null,
};
