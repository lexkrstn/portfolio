import React, { FC } from 'react';
import config from '../../config';
import { yearsFrom } from '../../utils/filters';
import { LanguageLevels, Skill } from '../interfaces';
import * as S from './styles';

export interface Props {
  skill: Skill;
}

const SkillCard: FC<Props> = ({ skill }) => {
  const maxLevel = skill.group === 'lang' ? 9 : 5;
  return (
    <S.SkillCard>
      <S.Header>
        {!!skill.icon && (
          <S.Icon src={`${config.basePath}images/skills/${skill.icon}`} />
        )}
        <S.Name>{skill.name}</S.Name>
        {!!skill.masteryYear && (
          <S.Experience>{yearsFrom(skill.masteryYear)}</S.Experience>
        )}
        {!skill.masteryYear && skill.group !== 'lang' && (
          <S.Experience>*</S.Experience>
        )}
        {skill.group === 'lang' && (
          <S.Experience>{LanguageLevels[skill.level]}</S.Experience>
        )}
      </S.Header>
      <S.Level>
        <S.LevelProgress style={{ width: `${(skill.level / maxLevel) * 100}%` }} />
      </S.Level>
      <S.Note dangerouslySetInnerHTML={{ __html: skill.note }} />
    </S.SkillCard>
  );
};

SkillCard.displayName = 'SkillCard';

export default SkillCard;
