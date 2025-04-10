import Grid from '@mui/material/Grid';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../components/Image';
import GradientBackground from '../../components/GradientBackground';
import RingSpinner from '../../components/RingSpinner';
import Appeal from '../../components/Appeal';
import config from '../../config';
import {
  selectSkills, selectBasicSkills, selectMiscSkills, selectLangSkills,
  selectSkillsFetched, fetchSkills,
} from './duck';
import CharSheet from './CharSheet';
import Skills from './Skills';
import Story from './Story';
import Certificates from './Certificates';
import * as S from './styles';

// Cache for images.
// The Image doesn't load on server side, so it's safe to keep it here in SSR.
const imageCache = {};

/**
 * About page HOC.
 */
const About: FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector(selectSkills);
  const basicSkills = useSelector(selectBasicSkills);
  const miscSkills = useSelector(selectMiscSkills);
  const langSkills = useSelector(selectLangSkills);
  const skillsFetched = useSelector(selectSkillsFetched);

  useEffect(() => {
    if (!skillsFetched) {
      dispatch(fetchSkills());
    }
  });

  return (
    <S.About>
      <GradientBackground />
      <S.Container>
        <Grid container spacing={4}>
          <Grid item lg={4} sx={{ display: { xs: 'none', lg: 'flex' } }} />
          <Grid item xs={12} lg={8}>
            <S.Title>About me</S.Title>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} lg={12}>
                <S.PhotoAndName>
                  <S.Photo>
                    <Image
                      src={`${config.staticUrl}/images/photo.png`}
                      height={200}
                      aspect={1}
                      cache={imageCache}
                    />
                  </S.Photo>
                  <S.Name>Alexander Korostin</S.Name>
                </S.PhotoAndName>
              </Grid>
              <Grid item xs={12} md={6} lg={12}>
                <CharSheet />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8}>
            <Story />
          </Grid>
        </Grid>
        {/**<S.Section>
          <S.Heading>Certificates</S.Heading>
          <Certificates />
        </S.Section>**/}
        <S.Section>
          <S.Heading>Skills &amp; experience</S.Heading>
          <Skills
            basicSkills={basicSkills}
            miscSkills={miscSkills}
            langSkills={langSkills}
          />
          {!skills && (
            <S.Placeholder>
              <RingSpinner size="2em" />
            </S.Placeholder>
          )}
        </S.Section>
        <Appeal />
      </S.Container>
    </S.About>
  );
};

About.displayName = 'About';

export default About;
