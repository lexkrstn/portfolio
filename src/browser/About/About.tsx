import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../widgets/Image';
import GradientBackground from '../widgets/GradientBackground';
import { Col, GridTheme, Row } from '../widgets/Grid';
import RingSpinner from '../widgets/RingSpinner';
import { haveRequestedSkills, getSkills } from './duck/selectors';
import SkillCard from './SkillCard';
import * as S from './styles';
import * as actions from './duck/actions';
import { yearsFrom } from '../utils';
import config from '../config';

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
        <GridTheme gutterX="32px" gutterY="32px">
          <Row>
            <Col lg={{ offset: 2/6, width: 4/6 }}>
              <S.Title>About me</S.Title>
            </Col>
          </Row>
          <Row>
            <Col lg={2/6}>
              <Row>
                <Col md={1/2} lg={1}>
                  <S.PhotoAndName>
                    <S.Photo>
                      <Image src="/images/photo.png" height={200} aspect={1} />
                    </S.Photo>
                    <S.Name>Alexander Korostin</S.Name>
                  </S.PhotoAndName>
                </Col>
                <Col md={1/2} lg={1}>
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
                </Col>
              </Row>
            </Col>
            <Col lg={4/6}>
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
                But before I became a web developer, I couldn't imagine myself
                to be anyone other than a 3d programmer. And back then I even
                took an academic leave for several years to devote myself
                entirely to development of a start-up project of my own. During
                this time I had to make a living as a freelance web developer,
                and in the end I realized that I loved my part-time job as much
                as I loved 3d programming. So, for the next decade I gradually
                moved from e-commerce projects using CMS to framework-based
                website development as a backend and frontend programmer.
                This is the short answer where my C++ knowledge comes from =)
              </S.Para>
            </Col>
          </Row>
        </GridTheme>
        <S.Section>
          <S.Heading>Skills &amp; experience</S.Heading>
          {!!skills && (
            <GridTheme gutterX="32px" gutterY="32px">
              <S.SubHeading>Languages and frameworks</S.SubHeading>
              <Row>
                {basicSkills.map(skill => (
                  <Col key={skill.id} sm={1/2} md={1/3} lg={1/4}>
                    <SkillCard skill={skill} />
                  </Col>
                ))}
              </Row>
              <S.SubHeading>Miscellaneous</S.SubHeading>
              <Row>
                {miscSkills.map(skill => (
                  <Col key={skill.id} sm={1/2} md={1/3} lg={1/4}>
                    <SkillCard skill={skill} />
                  </Col>
                ))}
              </Row>
              <S.SubHeading>Languages</S.SubHeading>
              <Row>
                {langSkills.map(skill => (
                  <Col key={skill.id} sm={1/2} md={1/3}>
                    <SkillCard skill={skill} />
                  </Col>
                ))}
              </Row>
            </GridTheme>
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
