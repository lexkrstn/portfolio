import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { Skill } from '../../../entities';
import SkillCard from '../../../components/SkillCard';
import * as S from './styles';

interface Props {
  basicSkills: Skill[];
  miscSkills: Skill[];
  langSkills: Skill[];
}

const Skills: FC<Props> = ({ basicSkills, miscSkills, langSkills }) => (
  <>
    <S.SubHeading>Languages and frameworks</S.SubHeading>
    <Grid container spacing={4}>
      {basicSkills.map(skill => (
        <Grid item key={skill._id} sm={6} md={4} lg={3}>
          <SkillCard skill={skill} />
        </Grid>
      ))}
    </Grid>
    <S.SubHeading>Miscellaneous</S.SubHeading>
    <Grid container spacing={4}>
      {miscSkills.map(skill => (
        <Grid item key={skill._id} sm={6} md={4} lg={3}>
          <SkillCard skill={skill} />
        </Grid>
      ))}
    </Grid>
    <S.SubHeading>Languages</S.SubHeading>
    <Grid container spacing={4}>
      {langSkills.map(skill => (
        <Grid item key={skill._id} sm={6} md={4}>
          <SkillCard skill={skill} />
        </Grid>
      ))}
    </Grid>
  </>
);

Skills.displayName = 'Skills';

export default Skills;
