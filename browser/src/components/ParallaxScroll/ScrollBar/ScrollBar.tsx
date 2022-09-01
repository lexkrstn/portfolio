import React, {
  FC, PointerEvent, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import throttle from 'lodash/throttle';
import { ParallaxScrollContext } from '../ParallaxScrollContext';
import * as S from './styles';

function yPosToScrollRatio(
  y: number,
  handleEl: HTMLElement,
  barEl: HTMLElement,
) {
  const { top: barTop } = barEl.getBoundingClientRect();
  const handleHeight = handleEl.clientHeight;
  const scrollPos = y - barTop - handleHeight / 2;
  const scrollHeight = barEl.clientHeight - handleHeight;
  return Math.max(0, Math.min(1, scrollPos / scrollHeight));
}

interface Props {
  bigNavbar?: boolean;
  hideTimeout?: number;
}

const ScrollBar: FC<Props> = ({ bigNavbar, hideTimeout }) => {
  const [hidden, setHidden] = useState(false);
  const hideTimeoutIdRef = useRef<NodeJS.Timeout>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const capturedPointerIdRef = useRef<number>(null);
  const {
    addScrollListener, removeScrollListener, scrollTo,
  } = useContext(ParallaxScrollContext);

  const rechargeHideTimeout = () => {
    setHidden(false);
    if (hideTimeoutIdRef.current) {
      clearTimeout(hideTimeoutIdRef.current);
    }
    hideTimeoutIdRef.current = setTimeout(() => {
      clearTimeout(hideTimeoutIdRef.current);
      hideTimeoutIdRef.current = null;
      setHidden(true);
    }, hideTimeout);
  };

  const updateHandlePosition = useCallback(throttle((scrollRatio: number) => {
    const barHeight = barRef.current.clientHeight;
    const handleHeight = handleRef.current.clientHeight;
    const freeBarHeight = barHeight - handleHeight;
    const handleTop = Math.round(freeBarHeight * scrollRatio);
    handleRef.current.style.top = `${handleTop}px`;
    // Recharge the timeout that hides the scroll bar
    rechargeHideTimeout();
  }, 1000 / 60), [hideTimeout]);

  const handlePointerEvent = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.type === 'pointerdown' && capturedPointerIdRef.current === null) {
      capturedPointerIdRef.current = event.pointerId;
      barRef.current.setPointerCapture(event.pointerId);
      const scrollRatio = yPosToScrollRatio(event.clientY, handleRef.current, barRef.current);
      scrollTo(scrollRatio);
    } else if (event.type === 'pointerup' && event.pointerId === capturedPointerIdRef.current) {
      barRef.current.releasePointerCapture(capturedPointerIdRef.current);
      capturedPointerIdRef.current = null;
    } else if (event.type === 'pointermove' && event.pointerId === capturedPointerIdRef.current) {
      const scrollRatio = yPosToScrollRatio(event.clientY, handleRef.current, barRef.current);
      scrollTo(scrollRatio, true);
    }
  }, [scrollTo]);

  useEffect(() => {
    addScrollListener(updateHandlePosition);
    return () => {
      removeScrollListener(updateHandlePosition);
    };
  }, [removeScrollListener]);

  useEffect(() => {
    rechargeHideTimeout();
    return () => {
      clearTimeout(hideTimeoutIdRef.current);
      hideTimeoutIdRef.current = null;
    };
  }, []);

  return (
    <S.ScrollBar
      ref={barRef}
      bigNavbar={bigNavbar}
      visible={!hidden}
      onPointerDown={handlePointerEvent}
      onPointerMove={handlePointerEvent}
      onPointerUp={handlePointerEvent}
    >
      <S.Handle ref={handleRef} />
    </S.ScrollBar>
  );
};

ScrollBar.displayName = 'ScrollBar';

ScrollBar.defaultProps = {
  bigNavbar: false,
  hideTimeout: 3000,
};

export default ScrollBar;
