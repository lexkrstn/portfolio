import React, { ReactElement } from 'react';
import config from '../../config';
import Skill, { LanguageLevels } from '../duck/Skill';
import * as S from './styles';

const YEAR = new Date().getFullYear();

export interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps): ReactElement {
  return (
    <S.SkillCard>
      <S.Header>
        {!!skill.icon && (
          <S.Icon src={`${config.basePath}images/skills/${skill.icon}`} />
        )}
        <S.Name>{skill.name}</S.Name>
        {!!skill.masteryYear && (
          <S.Experience>{YEAR - skill.masteryYear} years</S.Experience>
        )}
        {!skill.masteryYear && skill.group !== 'lang' && (
          <S.Experience>*</S.Experience>
        )}
        {skill.group === 'lang' && (
          <S.Experience>{LanguageLevels[skill.level]}</S.Experience>
        )}
      </S.Header>
      <S.Note dangerouslySetInnerHTML={{ __html: skill.note }} />
    </S.SkillCard>
  );
}
