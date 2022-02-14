import React, { ReactElement, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openContactDialog } from '../../App/duck';
import * as S from './styles';

/**
 * The call to conversation shown in the footer of some portfolio pages.
 */
export default function Appeal(): ReactElement {
  const dispatch = useDispatch();
  const onContactClick = useCallback(() => dispatch(openContactDialog()), []);
  return (
    <S.Appeal>
      <S.Heading>Let&apos;s talk</S.Heading>
      <S.Para>Wanna get in touch or talk about a project?</S.Para>
      <S.Para>
        Feel free to contact me via email
        at <a href="mailto:lexkrstn@gmail.com">lexkrstn@gmail.com</a>
      </S.Para>
      <S.Para>
        or drop a line in
        the <S.Link onClick={onContactClick}>contact form</S.Link>
      </S.Para>
    </S.Appeal>
  );
}
