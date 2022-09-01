import throttle from 'lodash/throttle';
import React, { FC, useEffect, useRef } from 'react';
import { lerp } from '../../utils';
import * as S from './styles';

interface Props {
  interactive?: boolean;
}

const GradientBackground: FC<Props> = ({ interactive }) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (!interactive) return undefined;
    const onMouseMove = throttle((e: MouseEvent) => {
      if (!ref.current) return;
      const x = Math.round(lerp(0.2, 0.8, e.screenX / window.innerWidth) * 100);
      ref.current.style.backgroundImage = `
        radial-gradient(ellipse at ${x}% 0%, #e66465, transparent),
        radial-gradient(ellipse at ${100 - x}% 100%, #4d9f0c, transparent)
      `;
    }, 20);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
  return <S.GradientBackground ref={ref} />;
};

GradientBackground.defaultProps = {
  interactive: true,
};

GradientBackground.displayName = 'GradientBackground';

export default GradientBackground;
