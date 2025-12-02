import React, { FC } from 'react';
import * as S from './styles';
import { publications } from './data';

const Publications: FC = () => {
  if (publications.length === 0) {
    return null;
  }

  return (
    <S.Publications>
      {publications.map((pub, index) => (
        <S.Publication key={index}>
          <S.PublicationDate>{pub.date}</S.PublicationDate>
          <S.PublicationTitle>
            <S.PublicationLink href={pub.link} target="_blank" rel="noopener noreferrer">
              {pub.title}
            </S.PublicationLink>
          </S.PublicationTitle>
          <S.PublicationJournal>{pub.journal}</S.PublicationJournal>
          <S.PublicationDescription>
            {pub.description}
          </S.PublicationDescription>
          {pub.doi && <S.PublicationDOI href={pub.doi} target="_blank" rel="noopener noreferrer">DOI: {pub.doi}</S.PublicationDOI>}
        </S.Publication>
      ))}
    </S.Publications>
  );
};

Publications.displayName = 'Publications';

export default Publications;

