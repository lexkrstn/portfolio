import React, { FC, useEffect, useState } from 'react';
import ProgressRing from '../ProgressRing';
import * as S from './styles';

interface Props {
  /**
   * The ratio between width and height that affects the height. It should be
   * specified either this or the height.
   */
  aspect?: number;
  /**
   * Sets fixed height of the component. It should be specified either this or
   * the aspect ratio.
   */
  height?: number;
  /**
   * Progress in percents. Leaving it undefined enables fake progressing.
   */
  progress?: number;
  /**
   * Fake progress duration in seconds. The fake progressing is only enabled if
   * the progress prop is undefined or null.
   */
  duration?: number;
}

const Loading: FC<Props> = ({ aspect, duration, height, progress }) => {
  const fake = progress === null || progress === undefined;
  const [fakeProgress, setFakeProgress] = useState(0);
  useEffect(() => {
    if (!fake || duration === 0) return undefined;
    const tickInterval = 250;
    const tickCount = Math.round((1000 * duration) / tickInterval);
    let ticks = 0;
    let intervalId = setInterval(() => {
      setFakeProgress(Math.round((100 * ++ticks) / tickCount));
      if (ticks === tickCount) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, tickInterval);
    return (): void => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fake, duration]);
  return (
    <S.Loading height={height} aspect={aspect}>
      <S.Content>
        <S.RingBack>
          <ProgressRing size={46} stroke={2} progress={100} />
        </S.RingBack>
        <S.RingBox>
          <ProgressRing size={46} stroke={2} progress={progress ?? fakeProgress} />
          <S.Percent>
            {Math.round(progress ?? fakeProgress)}
            %
          </S.Percent>
        </S.RingBox>
        <S.Legend>Loading...</S.Legend>
      </S.Content>
    </S.Loading>
  );
};

Loading.defaultProps = {
  aspect: 0,
  height: 0,
  progress: null,
  duration: 5,
};

Loading.displayName = 'Loading';

export default Loading;
