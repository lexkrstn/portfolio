import React, { FC, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteConfigComponentProps } from 'react-router-config';
import { Helmet } from 'react-helmet-async';
import GradientBackground from '../../components/GradientBackground';
import { isVideoUrl } from '../../utils';
import Slider from '../../components/Slider';
import Image from '../../components/Image';
import Appeal from '../../components/Appeal';
import Loading from '../../components/Loading';
import Video from '../../components/Video';
import config from '../../config';
import { fetchWork, selectWork, selectWorkFetched } from '../Portfolio/duck';
import * as S from './styles';

type Props = RouteConfigComponentProps<{ id: string }>;

/**
 * Portfolio work page.
 */
const Work: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const imageCache = useRef<Record<string, string>>({});
  const work = useSelector(selectWork);
  const fetched = useSelector(selectWorkFetched);
  const fetchedRight = fetched && (work?._id === match.params.id || work?.slug === match.params.id);
  const about = useMemo(() => {
    if (!work) return [];
    return work.about
      .split(/(?:\r?\n){2}/g)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, [work]);

  useEffect(() => {
    if (!fetchedRight) {
      dispatch(fetchWork(match.params.id));
    }
  }, [fetchedRight]);

  return (
    <S.Work>
      <Helmet>
        <title>{`Alexander Korostin | ${work?.name ?? 'Work'}`}</title>
      </Helmet>
      <GradientBackground />
      <S.Container>
        <S.Box>
          {!fetchedRight && <Loading aspect={2} />}
          {fetchedRight && (
            <>
              <S.Title>{work.name}</S.Title>
              <S.Brief>{work.description}</S.Brief>
              <Slider>
                {work.screenshots.map((src: string, i: number) => (
                  <React.Fragment key={src}>
                    {!isVideoUrl(src) && (
                      <Image
                        src={`${config.staticUrl}/images/portfolio/${src}`}
                        alt={`${work.name} ${i + 1}`}
                        aspect={2}
                        cache={imageCache.current}
                      />
                    )}
                    {isVideoUrl(src) && <Video src={src} />}
                  </React.Fragment>
                ))}
              </Slider>
              <S.Section>
                <S.Heading>About this project</S.Heading>
                <S.Divider />
                {about.map(para => <S.Para key={para}>{para}</S.Para>)}
              </S.Section>
              <S.Section>
                <S.Heading>Technical Sheet</S.Heading>
                <S.Subheading>
                  Code technologies I got involved with while working on this project.
                </S.Subheading>
                <S.Divider />
                <S.List>
                  {work.techniques.map(tech => <S.Item key={tech}>{tech}</S.Item>)}
                </S.List>
              </S.Section>
              <S.Section>
                <S.Heading>Resources</S.Heading>
                <S.Divider />
                <S.List>
                  {work.links.map(link => (
                    <S.Item key={link.url}>
                      {link.description ? `${link.description} ` : false}
                      <S.Link href={link.url}>{link.label}</S.Link>
                    </S.Item>
                  ))}
                </S.List>
              </S.Section>
            </>
          )}
        </S.Box>
        <Appeal />
      </S.Container>
    </S.Work>
  );
};

Work.displayName = 'Work';

export default Work;
