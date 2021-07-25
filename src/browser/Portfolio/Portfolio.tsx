import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import GradientBackground from '../widgets/GradientBackground';
import { PortfolioSelectors } from './duck';
import HashTagFilter from './HashTagFilter';
import * as S from './styles';

export default function Portfolio(): ReactElement {
  const selectedTagId = useSelector(PortfolioSelectors.getSelectedHashTagId);
  const tags = useSelector(PortfolioSelectors.getHashTags);
  const selectedTag = tags ? tags.find(tag => tag.id === selectedTagId) : null;

  return (
    <S.Portfolio>
      <GradientBackground />
      <S.Container>
        <S.Heading>Works</S.Heading>
        <S.Subheading>
          From Web Components and UI/UX animations to React, Redux, Vue, and NodeJS.
          Check out my latest web software development portfolio projects.
        </S.Subheading>
        <HashTagFilter />
        <S.ResultSummary>
          {selectedTagId > 0 && <>
            Showing <b>3</b> works filtered by <b>{selectedTag.name}</b>
          </>}
          {selectedTagId === 0 && <>
            Showing all works. Use the filter to list them by skill.
          </>}
        </S.ResultSummary>
      </S.Container>
    </S.Portfolio>
  );
}
