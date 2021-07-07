import { Github, Linkedin } from '@styled-icons/fa-brands';
import React, { ReactElement } from 'react';
import * as S from './styles';

export default function SocialNav(): ReactElement {
  return (
    <S.SocialNav>
      <S.SocialButton href="https://www.linkedin.com/in/alexander-korostin/">
        <Linkedin />
      </S.SocialButton>
      <S.SocialButton href="https://github.com/lexkrstn">
        <Github />
      </S.SocialButton>
    </S.SocialNav>
  );
}
