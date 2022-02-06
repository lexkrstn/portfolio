import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React, { ReactElement } from 'react';
import * as S from './styles';

export default function SocialNav(): ReactElement {
  return (
    <S.SocialNav>
      <S.SubHeader>I&rsquo;m also on social media</S.SubHeader>
      <S.SocialButton href="https://www.linkedin.com/in/alexander-korostin/" className="linkedin">
        <LinkedInIcon fontSize="large" viewBox="2 2 20 20" />
        <S.SocialName>LinkedIn</S.SocialName>
      </S.SocialButton>
      <S.SocialButton href="https://github.com/lexkrstn" className="github">
        <GitHubIcon fontSize="large" />
        <S.SocialName>GitHub</S.SocialName>
      </S.SocialButton>
    </S.SocialNav>
  );
}
