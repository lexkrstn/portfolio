import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React, { ReactElement } from 'react';
import * as S from './styles';

export default function SocialNav(): ReactElement {
  return (
    <S.SocialNav>
      <S.SocialButton href="https://www.linkedin.com/in/alexander-korostin/">
        <LinkedInIcon fontSize="large" viewBox="2 2 20 20" />
      </S.SocialButton>
      <S.SocialButton href="https://github.com/lexkrstn">
        <GitHubIcon fontSize="large" />
      </S.SocialButton>
    </S.SocialNav>
  );
}
