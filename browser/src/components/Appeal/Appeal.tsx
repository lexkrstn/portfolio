import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openContactDialog } from '../../pages/_App/duck';
import config from '../../config';
import * as S from './styles';

/**
 * The call to conversation shown in the footer of some portfolio pages.
 */
const Appeal: FC = () => {
  const dispatch = useDispatch();
  const onContactClick = useCallback(() => dispatch(openContactDialog()), []);
  return (
    <S.Appeal>
      <S.Heading>Let&apos;s talk</S.Heading>
      <S.Para>Wanna get in touch or talk about a project?</S.Para>
      <S.Para>
        {'Feel free to contact me via email at '}
        <a href={`mailto:${config.contact.email}`} target="_blank" rel="noreferrer">
          {config.contact.email}
        </a>
      </S.Para>
      <S.Para>
        or drop a line in
        the <S.Link onClick={onContactClick}>contact form</S.Link>
      </S.Para>
      <S.SocialNav>
        <S.SocialButton
          href={config.contact.linkedIn}
          title="LinkedIn"
        >
          <LinkedInIcon fontSize="medium" viewBox="2 2 20 20" />
        </S.SocialButton>
        <S.SocialButton
          href={config.contact.github}
          title="GitHub"
        >
          <GitHubIcon fontSize="medium" />
        </S.SocialButton>
      </S.SocialNav>
    </S.Appeal>
  );
};

Appeal.displayName = 'Appeal';

export default Appeal;
