import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../widgets/Image';
import GradientBackground from '../widgets/GradientBackground';
import RingSpinner from '../widgets/RingSpinner';
import { haveRequestedSkills, getSkills } from './duck/skills/selectors';
import SkillCard from './SkillCard';
import * as S from './styles';
import * as actions from './duck/skills/slice';
import { yearsFrom } from '../utils';
import config from '../config';

// Cache for images.
// The Image doesn't load on server side, so it's safe to keep it here in SSR.
const imageCache = {};

/**
 * About page HOC.
 */
export default function About() {
  const dispatch = useDispatch();
  const skills = useSelector(getSkills);
  const basicSkills = skills ? skills.filter(s => s.group === 'basic') : [];
  const miscSkills = skills ? skills.filter(s => s.group === 'misc') : [];
  const langSkills = skills ? skills.filter(s => s.group === 'lang') : [];
  const skillsRequested = useSelector(haveRequestedSkills);
  const { email } = config.contact;

  useEffect(() => {
    if (!skillsRequested) {
      dispatch(actions.request());
    }
  });

  return (
    <S.About>
      <GradientBackground />
      <S.Container>
        <Grid container spacing={4}>
          <Grid item lg={4} />
          <Grid item lg={8}>
            <S.Title>About me</S.Title>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item lg={4}>
            <Grid container spacing={4}>
              <Grid item md={6} lg={12}>
                <S.PhotoAndName>
                  <S.Photo>
                    <Image
                      src="/images/photo.png"
                      height={200}
                      aspect={1}
                      cache={imageCache}
                    />
                  </S.Photo>
                  <S.Name>Alexander Korostin</S.Name>
                </S.PhotoAndName>
              </Grid>
              <Grid item md={6} lg={12}>
                <S.CharSheet>
                  <S.Attribute>
                    <S.AttributeName>Age</S.AttributeName>
                    <S.AttributeValue>{yearsFrom(new Date(1990, 5, 15))}</S.AttributeValue>
                  </S.Attribute>
                  <S.Attribute>
                    <S.AttributeName>Experience</S.AttributeName>
                    <S.AttributeValue>{yearsFrom(new Date(2009, 0, 1))} years</S.AttributeValue>
                  </S.Attribute>
                  <S.Attribute>
                    <S.AttributeName>Location</S.AttributeName>
                    <S.AttributeValue>Ukraine</S.AttributeValue>
                  </S.Attribute>
                  <S.Attribute>
                    <S.AttributeName>Email</S.AttributeName>
                    <S.AttributeValue>
                      <a href={`mailto:${email}`}>{email}</a>
                    </S.AttributeValue>
                  </S.Attribute>
                </S.CharSheet>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8}>
            <S.Para>
              Since beginning my journey as a freelance developer nearly 10
              years ago, I’ve done remote work for agencies, consulted for
              startups, and collaborated with talented people to create web
              products for both business and consumer use.
            </S.Para>
            <S.Para>
              I create successful websites and services that are fast, easy to
              use, and built with best practices. The main area of my expertise
              is SPA development, both server-side and client-side.
            </S.Para>
            <S.Para>
              But before I became a web developer, I couldn&apos;t imagine
              myself to be anyone other than a 3d programmer. So I took an
              academic leave for several years to devote myself entirely to
              development of my own start-up project. During
              this time I had to make a living as a freelance web developer,
              but in the end I realized that I loved my part-time job as much
              as I loved 3d programming. So, for the next decade I gradually
              moved from e-commerce projects using CMS to framework-based
              website development, both backend and frontend.
              This is the short answer where my C++ knowledge comes from =)
            </S.Para>
          </Grid>
        </Grid>
        <S.Section>
          <S.Heading>Skills &amp; experience</S.Heading>
          {!!skills && (
            <>
              <S.SubHeading>Languages and frameworks</S.SubHeading>
              <Grid container spacing={4}>
                {basicSkills.map(skill => (
                  <Grid item key={skill.id} sm={6} md={4} lg={3}>
                    <SkillCard skill={skill} />
                  </Grid>
                ))}
              </Grid>
              <S.SubHeading>Miscellaneous</S.SubHeading>
              <Grid container spacing={4}>
                {miscSkills.map(skill => (
                  <Grid item key={skill.id} sm={6} md={4} lg={3}>
                    <SkillCard skill={skill} />
                  </Grid>
                ))}
              </Grid>
              <S.SubHeading>Languages</S.SubHeading>
              <Grid container spacing={4}>
                {langSkills.map(skill => (
                  <Grid item key={skill.id} sm={6} md={4}>
                    <SkillCard skill={skill} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          {!skills && (
            <S.Placeholder>
              <RingSpinner size="2em" />
            </S.Placeholder>
          )}
        </S.Section>
      </S.Container>
    </S.About>
  );
}
