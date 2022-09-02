import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import React, { FC } from 'react';
import config from '../../../config';
import * as S from './styles';

const SocialNav: FC = () => (
  <S.SocialNav>
    <S.SocialButton href={config.contact.linkedIn}>
      <LinkedInIcon fontSize="large" viewBox="2 2 20 20" />
    </S.SocialButton>
    <S.SocialButton href={config.contact.github}>
      <GitHubIcon fontSize="large" />
    </S.SocialButton>
    <S.SocialButton href={`mailto:${config.contact.email}`}>
      <EmailIcon fontSize="large" />
    </S.SocialButton>
  </S.SocialNav>
);

SocialNav.displayName = 'SocialNav';

export default SocialNav;
