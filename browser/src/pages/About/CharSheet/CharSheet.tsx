import React, { FC } from 'react';
import LocationOn from '@mui/icons-material/LocationOn';
import School from '@mui/icons-material/School';
import config from '../../../config';
import { yearsFrom } from '../../../utils';
import * as S from './styles';

const CharSheet: FC = () => (
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
      <S.AttributeName>Education</S.AttributeName>
      <S.AttributeValue>
        <School fontSize="small" style={{ verticalAlign: 'middle' }} />
        {' Master\'s in SE'}
      </S.AttributeValue>
    </S.Attribute>
    <S.Attribute>
      <S.AttributeName>Location</S.AttributeName>
      <S.AttributeValue>
        <LocationOn fontSize="small" style={{ verticalAlign: 'middle' }} />
        {' Antwerp, Belgium'}
      </S.AttributeValue>
    </S.Attribute>
    <S.Attribute>
      <S.AttributeName>Email</S.AttributeName>
      <S.AttributeValue>
        <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a>
      </S.AttributeValue>
    </S.Attribute>
  </S.CharSheet>
);

CharSheet.displayName = 'CharSheet';

export default CharSheet;
