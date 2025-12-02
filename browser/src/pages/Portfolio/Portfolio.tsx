import Grid from '@mui/material/Grid';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import GradientBackground from '../../components/GradientBackground';
import RingSpinner from '../../components/RingSpinner';
import Card from '../../components/Card';
import {
  selectSelectedTag, selectTags, setTagSelected,
  fetchTags, fetchWorks, selectTaggedWorks, selectTaggedWorksTags,
} from './duck';
import Appeal from '../../components/Appeal';
import TagFilter from '../../components/TagFilter';
import config from '../../config';
import * as S from './styles';

/**
 * Portfolio page.
 */
const Portfolio: FC = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const selectedTag = useSelector(selectSelectedTag);
  const works = useSelector(selectTaggedWorks);
  const worksTags = useSelector(selectTaggedWorksTags);

  const onClickTag = useCallback((tagId: string) => {
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
      <Helmet>
        <title>Alexander Korostin | Portfolio</title>
      </Helmet>
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
                <CSSTransition key={selectedTag?._id ?? 0} timeout={300} classNames="item">
                  <Grid container spacing={{ xs: 3, md: 2 }}>
                    {works.map((work, i) => (
                      <Grid item key={work._id} xs={12} md={6} lg={4}>
                        <Card
                          caption={work.name}
                          cover={`${config.staticUrl}/images/portfolio/${work.thumbnail}`}
                          route={`/portfolio/${work.slug}`}
                          tags={worksTags[i]}
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
};

Portfolio.displayName = 'Portfolio';

export default Portfolio;
