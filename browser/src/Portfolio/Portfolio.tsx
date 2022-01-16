import Grid from '@mui/material/Grid';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import GradientBackground from '../widgets/GradientBackground';
import RingSpinner from '../widgets/RingSpinner';
import Card from './Card';
import {
  selectSelectedTag, selectTags, setTagSelected,
  fetchTags, fetchWorks, selectTaggedWorks,
} from './duck';
import Appeal from './Appeal';
import TagFilter from './TagFilter';
import * as S from './styles';

export default function Portfolio(): ReactElement {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const selectedTag = useSelector(selectSelectedTag);
  const works = useSelector(selectTaggedWorks);

  const onClickTag = useCallback((tagId: number) => {
    dispatch(setTagSelected(tagId));
  }, []);

  useEffect(() => {
    if (!tags) {
      dispatch(fetchTags());
    }
    if (!works) {
      dispatch(fetchWorks());
    }
  });

  return (
    <S.Portfolio>
      <GradientBackground />
      <S.Container>
        <S.Heading>Works</S.Heading>
        <S.Subheading>
          From Web Components and UI/UX animations to React, Redux, Vue, and NodeJS.
          Check out my latest web software development portfolio projects.
        </S.Subheading>
        {!!tags && !!works && (
          <>
            <TagFilter />
            <S.ResultSummary>
              {!!selectedTag && (
                <>
                  Showing <b>{works ? works.length : '?'}</b> works
                  filtered by <b>{selectedTag.name}</b>
                </>
              )}
              {!selectedTag && (
                <>Showing all works. Use the filter to list them by skill.</>
              )}
            </S.ResultSummary>
            {!!works && !!tags && (
              <SwitchTransition mode="out-in">
                <CSSTransition key={selectedTag?.id ?? 0} timeout={300} classNames="item">
                  <Grid container spacing={2}>
                    {works.map(work => (
                      <Grid item key={work.id} sm={6} lg={4}>
                        <Card
                          caption={work.name}
                          cover={work.thumbnail}
                          route={`/portfolio/${work.id}`}
                          tags={tags.filter(tag => work.tagIds.some(tagId => tagId === tag.id))}
                          onClickTag={onClickTag}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CSSTransition>
              </SwitchTransition>
            )}
          </>
        )}
        {(!works || !tags) && (
          <S.Placeholder>
            <RingSpinner size="2em" />
          </S.Placeholder>
        )}
        <Appeal />
      </S.Container>
    </S.Portfolio>
  );
}
