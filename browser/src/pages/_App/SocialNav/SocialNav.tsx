import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React, { FC } from 'react';
import * as S from './styles';

const SocialNav: FC = () => (
  <S.SocialNav>
    <S.SocialButton href="https://www.linkedin.com/in/alexander-korostin/">
      <LinkedInIcon fontSize="large" viewBox="2 2 20 20" />
    </S.SocialButton>
    <S.SocialButton href="https://github.com/lexkrstn">
      <GitHubIcon fontSize="large" />
    </S.SocialButton>
  </S.SocialNav>
);

SocialNav.displayName = 'SocialNav';

export default SocialNav;
