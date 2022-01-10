import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './styles';

interface ParallaxScrollProps {
  children: ReactNode;
  /**
   * Number of additional screen heights to scroll. E.g. 1 means that scrollHeight
   * will be twice the clientHeight. Default is 1.
   */
  height?: number;
  /**
   * When set it gets the component to reset the scroller position whenever the
   * value changes. The value has no meaning, only the fact of its change matters.
   */
  resetOnChange?: string | number;
}

interface ParallaxScrollContextType {
  /**
   * Resets the scroller position (sets scrollTop 0).
   */
  resetScroll: () => void;
  /**
   * Scroller position that gradually changes from 0 to 1 when the user scrolls.
   *
   * Take in mind, that some browsers in some operation systems (e.g. iOS)
   * may support the overscroll effect. In that case the scroll value may go
   * beyond the [0, 1] range during the animation.
   */
  scroll: number;
}

export const ParallaxScrollContext = React.createContext<ParallaxScrollContextType>({
  resetScroll: () => {}, // tslint:disable-line no-empty
  scroll: 0,
});

export default function ParallaxScroll({
  children,
  height,
  resetOnChange,
}: ParallaxScrollProps): ReactElement {
  const [scroll, setScroll] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>();

  const onScrollSetScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.target as HTMLElement;
    const maxScroll = el.scrollHeight - el.clientHeight;
    setScroll(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
  }, []);

  const contextValue = useMemo(() => ({
    resetScroll: () => {
      scrollerRef.current.scrollTop = 0;
      setScroll(0);
    },
    scroll,
  }), [scroll]);

  const prevResetOnChangeRef = useRef(resetOnChange);
  useEffect(() => {
    if (prevResetOnChangeRef.current !== resetOnChange) {
      prevResetOnChangeRef.current = resetOnChange;
      contextValue.resetScroll();
    }
  });

  return (
    <S.ParallaxScroll>
      <S.Scroller
        onScroll={onScrollSetScroll}
        ref={scrollerRef}
        // Fix for Safari bug when max scroll height isn't updated during the
        // scrolling animation that leads to the animation ending up overscrolled
        // when the new content height is less than the one before the scrolling
        // had started.
        style={{ overflow: height === 0 ? 'auto' : '' }}
      >
        <S.Expander style={{ height: `${Math.round((1 + (height ?? 1)) * 100)}%` }}>
          <S.Content>
            <ParallaxScrollContext.Provider value={contextValue}>
              {children}
            </ParallaxScrollContext.Provider>
          </S.Content>
        </S.Expander>
      </S.Scroller>
    </S.ParallaxScroll>
  );
}
