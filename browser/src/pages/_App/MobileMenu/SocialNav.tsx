import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React, { FC } from 'react';
import config from '../../../config';
import * as S from './styles';

const SocialNav: FC = () => (
  <S.SocialNav>
    <S.SubHeader>I&rsquo;m also on social media</S.SubHeader>
    <S.SocialButton href={config.contact.linkedIn}>
      <S.SocialIcon network="linkedin">
        <LinkedInIcon fontSize="large" viewBox="2 2 20 20" />
      </S.SocialIcon>
      <S.SocialName>LinkedIn</S.SocialName>
    </S.SocialButton>
    <S.SocialButton href={config.contact.github}>
      <S.SocialIcon network="github">
        <GitHubIcon fontSize="large" />
      </S.SocialIcon>
      <S.SocialName>GitHub</S.SocialName>
    </S.SocialButton>
  </S.SocialNav>
);

SocialNav.displayName = 'SocialNav';

export default SocialNav;
