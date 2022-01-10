import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { loadImage } from '../../utils/helpers';
import Loading from '../Loading';
import * as S from './styles';

export interface ImageProps {
  alt?: string;
  aspect?: number;
  cache?: Record<string, string>;
  height?: number;
  src: string;
}

export default function Image({ alt, aspect, cache, height, src }: ImageProps): ReactElement {
  const [url, setUrl] = useState((cache && cache[src]) || '');
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (cache && cache[src]) {
      setUrl(cache[src]);
    } else {
      loadImage(src, setProgress)
        .then(newUrl => {
          if (cache) {
            cache[src] = newUrl;
          }
          setUrl(newUrl);
        });
    }
  }, [src]);
  return (
    <S.Image aspect={aspect}>
      <SwitchTransition mode="out-in">
        <CSSTransition key={url || ''} classNames="image-fade" timeout={300}>
          {url ? (
            <S.Frame aspect={aspect}>
              <S.Img src={url} alt={alt || ''} />
            </S.Frame>
          ) : (
            <Loading aspect={aspect} height={height} progress={progress} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </S.Image>
  );
}
