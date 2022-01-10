import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import * as S from './styles';

export default function Appeal(): ReactElement {
  return (
    <S.Appeal>
      <S.Heading>Let&apos;s talk</S.Heading>
      <S.Para>Wanna get in touch or talk about a project?</S.Para>
      <S.Para>
        Feel free to contact me via email
        at <a href="mailto:lexkrstn@gmail.com">lexkrstn@gmail.com</a>
      </S.Para>
      <S.Para>
        or drop a line in the form at
        the <NavLink to="/contact">contact page</NavLink>
      </S.Para>
    </S.Appeal>
  );
}
