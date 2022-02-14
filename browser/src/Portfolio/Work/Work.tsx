import React, {
  ReactElement, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteConfigComponentProps } from 'react-router-config';
import GradientBackground from '../../widgets/GradientBackground';
import { isVideoUrl } from '../../utils';
import Slider from '../../widgets/Slider';
import Image from '../../widgets/Image';
import Appeal from '../Appeal';
import { fetchWork, selectWork, selectWorkFetched } from '../duck';
import * as S from './styles';
import Loading from '../../widgets/Loading';
import Video from '../../widgets/Video';

type WorkProps = RouteConfigComponentProps<{ id: string }>;

/**
 * Portfolio work page.
 */
export default function Work({ match }: WorkProps): ReactElement {
  const dispatch = useDispatch();
  const imageCache = useRef<Record<string, string>>({});
  const work = useSelector(selectWork);
  const fetched = useSelector(selectWorkFetched);
  const about = useMemo(() => {
    if (!work) return [];
    return work.about
      .split(/(?:\r?\n){2}/g)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, [work]);

  useEffect(() => {
    if (!fetched || (work?._id !== match.params.id && work?.slug !== match.params.id)) {
      dispatch(fetchWork(match.params.id));
    }
  });

  return (
    <S.Work>
      <GradientBackground />
      <S.Container>
        <S.Box>
          {!work && <Loading aspect={2} />}
          {!!work && (
            <>
              <S.Title>{work.name}</S.Title>
              <S.Brief>{work.description}</S.Brief>
              <Slider>
                {work.screenshots.map((src: string, i: number) => (
                  <React.Fragment key={src}>
                    {!isVideoUrl(src) && (
                      <Image
                        src={src}
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
}
