import React, { ReactElement, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import * as S from './styles';

interface ParallaxScroll {
  children: ReactNode;
  height?: number;
}

interface ParallaxScrollContextType {
  scroll: number;
  resetScroll: () => void;
}

export const ParallaxScrollContext = React.createContext<ParallaxScrollContextType>({
  scroll: 0,
  resetScroll: () => {},
});

export default function ParallaxScroll({ children, height }: ParallaxScroll): ReactElement {
  const [scroll, setScroll] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>();
  const onScrollSetScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.target as HTMLElement;
    const maxScroll = el.scrollHeight - el.clientHeight;
    setScroll(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
  }, []);
  const contextValue = useMemo(() => ({
    scroll,
    resetScroll: () => {
      scrollerRef.current.scrollTop = 0;
      setScroll(0);
    },
  }), [scroll]);
  return (
    <S.ParallaxScroll>
      <S.Scroller onScroll={onScrollSetScroll} ref={scrollerRef}>
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
