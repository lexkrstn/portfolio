import React, { ReactElement } from 'react';
import * as S from './styles';

interface VideoProps {
  src: string;
}

function getVideoIdFromUrl(src: string): string {
  const chunks = src.split('/');
  return chunks[chunks.length - 1];
}

export default function Video({ src }: VideoProps): ReactElement {
  const params: Record<string, string | number> = {
    autoplay: 1,
    controls: 0,
    loop: 1,
    rel: 0,
    showinfo: 0,
    iv_load_policy: 3,
    playlist: getVideoIdFromUrl(src),
  };
  const paramsString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  const allow: string[] = [
    'accelerometer', 'autoplay', 'modestbranding', 'clipboard-write',
    'encrypted-media', 'gyroscope', 'picture-in-picture',
  ];
  return (
    <S.Video>
      <S.IFrame
        src={`${src}?${paramsString}`}
        title="YouTube video player"
        frameBorder="0"
        allow={allow.join('; ')}
      />
    </S.Video>
  );
}
