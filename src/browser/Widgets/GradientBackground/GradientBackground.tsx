import throttle from 'lodash/throttle';
import React, { ReactElement, useEffect, useRef } from 'react';
import { lerp } from '../../utils';
import * as S from './styles';

interface GradientBackgroundProps {
  interactive?: boolean;
}

export default function GradientBackground({ interactive }: GradientBackgroundProps): ReactElement {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (interactive === false) return;
    const onMouseMove = throttle((e: MouseEvent) => {
      const x = Math.round(lerp(0.2, 0.8, e.screenX / window.innerWidth) * 100);
      ref.current.style.backgroundImage = `
        radial-gradient(ellipse at ${x}% 0%, #e66465, transparent),
        radial-gradient(ellipse at ${100 - x}% 100%, #4d9f0c, transparent)
      `;
    }, 20);
    window.addEventListener('mousemove', onMouseMove);
    return function cleanup() {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
  return <S.GradientBackground ref={ref} />;
}
