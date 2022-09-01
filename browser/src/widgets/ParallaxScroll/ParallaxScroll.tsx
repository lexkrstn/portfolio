import React, {
  FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
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

type ScrollListener = (scrollRatio: number, scrollerElement: HTMLElement) => void;

interface ContextData {
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
  getScrollRatio: () => number;
  addScrollListener: (listener: ScrollListener) => void;
  removeScrollListener: (listener: ScrollListener) => void;
}

export const ParallaxScrollContext = React.createContext<ContextData>({
  resetScroll: () => {}, // eslint-disable-line no-empty
  getScrollRatio: () => 0,
  addScrollListener: () => {
    throw new Error('Cannot add a scroll listener without a context provider');
  },
  removeScrollListener: () => {
    throw new Error('Cannot remove a scroll listener without a context provider');
  },
});

const ParallaxScroll: FC<ParallaxScrollProps> = ({
  children, height, resetOnChange,
}) => {
  const [scrollerElement, setScrollerElement] = useState<HTMLDivElement | null>(null);
  const scrollListeners = useRef<ScrollListener[]>([]);

  const contextValue = useMemo((): ContextData => ({
    resetScroll: () => {
      if (!scrollerElement) return;
      scrollerElement.scrollTop = 0;
    },
    getScrollRatio: () => {
      if (!scrollerElement) return 0;
      const maxScroll = scrollerElement.scrollHeight - scrollerElement.clientHeight;
      return maxScroll > 0 ? scrollerElement.scrollTop / maxScroll : 0;
    },
    addScrollListener: listener => {
      scrollListeners.current.push(listener);
    },
    removeScrollListener: listener => {
      const index = scrollListeners.current.indexOf(listener);
      if (index >= 0) {
        scrollListeners.current.splice(index, 1);
      }
    },
  }), [scrollerElement]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.target as HTMLElement;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const scrollRatio = maxScroll > 0 ? el.scrollTop / maxScroll : 0;
    for (const listener of scrollListeners.current) {
      listener(scrollRatio, el);
    }
  }, []);

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
        onScroll={handleScroll}
        ref={setScrollerElement}
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

ParallaxScroll.displayName = 'ParallaxScroll';

ParallaxScroll.defaultProps = {
  height: undefined,
  resetOnChange: '',
};

export default ParallaxScroll;
