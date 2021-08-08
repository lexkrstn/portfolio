import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import GradientBackground from '../widgets/GradientBackground';
import { Col, GridTheme, Row } from '../widgets/Grid';
import RingSpinner from '../widgets/RingSpinner';
import Card from './Card';
import { actions, selectors } from './duck';
import Appeal from './Appeal';
import TagFilter from './TagFilter';
import * as S from './styles';

export default function Portfolio(): ReactElement {
  const dispatch = useDispatch();
  const selectedTagId = useSelector(selectors.tags.getSelectedId);
  const tags = useSelector(selectors.tags.getTags);
  const selectedTag = tags ? tags.find(tag => tag.id === selectedTagId) : null;
  const allWorks = useSelector(selectors.works.getWorks);

  const works = useMemo(
    () => !selectedTagId ? allWorks : allWorks?.filter(work => work.tagIds.includes(selectedTagId)),
    [selectedTagId, allWorks]
  );

  const onClickTag = useCallback((tagId: number) => {
    dispatch(actions.tags.select(tagId));
  }, []);

  useEffect(() => {
    if (!tags) {
      dispatch(actions.tags.request());
    }
    if (!allWorks) {
      dispatch(actions.works.request());
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
        {!!tags && !!works && <>
          <TagFilter />
          <S.ResultSummary>
            {selectedTagId > 0 && <>
              Showing <b>{works ? works.length : '?'}</b> works
              filtered by <b>{selectedTag.name}</b>
            </>}
            {selectedTagId === 0 && <>
              Showing all works. Use the filter to list them by skill.
            </>}
          </S.ResultSummary>
          {!!works && !!tags && <GridTheme gutterX="25px" gutterY="25px">
            <SwitchTransition mode="out-in">
              <CSSTransition key={selectedTagId} timeout={300} classNames="item">
                <Row>
                  {works.map(work => (
                    <Col key={work.id} sm={1/2} lg={1/3}>
                      <Card
                        caption={work.name}
                        cover={work.thumbnail}
                        route={`/portfolio/${work.id}`}
                        tags={tags.filter(tag => work.tagIds.some(tagId => tagId === tag.id))}
                        onClickTag={onClickTag}
                      />
                    </Col>
                  ))}
                </Row>
              </CSSTransition>
            </SwitchTransition>
          </GridTheme>}
        </>}
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
