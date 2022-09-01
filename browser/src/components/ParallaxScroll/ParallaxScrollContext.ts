import React from 'react';

export type ScrollListener = (scrollRatio: number, scrollerElement: HTMLElement) => void;

export interface ContextData {
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
  /**
   * Using smooth behavior or instantly, scrolls to a specified position, which
   * ranges from 0 to 1.
   */
  scrollTo: (scrollRatio: number, instantly?: boolean) => void;
  addScrollListener: (listener: ScrollListener) => void;
  removeScrollListener: (listener: ScrollListener) => void;
}

export const ParallaxScrollContext = React.createContext<ContextData>({
  resetScroll: () => {}, // eslint-disable-line no-empty
  getScrollRatio: () => 0,
  scrollTo: () => {
    throw new Error('Cannot scroll without a context provider');
  },
  addScrollListener: () => {
    throw new Error('Cannot add a scroll listener without a context provider');
  },
  removeScrollListener: () => {
    throw new Error('Cannot remove a scroll listener without a context provider');
  },
});
