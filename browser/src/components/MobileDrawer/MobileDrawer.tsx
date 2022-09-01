import React, { FC, ReactChild } from 'react';
import * as S from './styles';

interface Props {
  open: 'left' | 'right' | false;
  children: ReactChild;
  leftMenu?: ReactChild;
  rightMenu?: ReactChild;
  onClose: () => void;
}

/**
 * The main navigation drawer for mobile menu.
 */
const MobileDrawer: FC<Props> = ({ children, open, leftMenu, rightMenu, onClose }) => {
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
};

MobileDrawer.defaultProps = {
  leftMenu: null,
  rightMenu: null,
};

MobileDrawer.displayName = 'MobileDrawer';

export default MobileDrawer;
