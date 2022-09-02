import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as S from './styles';

interface Props {
  className?: string;
  message: string | ReactNode;
  inline?: boolean;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
}

const Tooltip: FC<Props> = ({
  className, children, inline, message, position, offset,
}) => {
  const [shown, setShown] = useState(false);
  const [presented, setPresented] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const show = useCallback(() => setShown(true), []);
  const hide = useCallback(() => setShown(false), []);

  useEffect(() => {
    if (!messageRef.current) {
      setPresented(true);
      return;
    }
    if (!shown) return;
    const rect = hostRef.current!.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    let top = rect.top + window.scrollY;
    if (position === 'top' || position === 'bottom') {
      left += rect.width / 2;
    } else if (position === 'left' || position === 'right') {
      top += rect.height / 2;
    }
    if (position === 'bottom') {
      top += rect.height;
    } else if (position === 'right') {
      left += rect.width;
    }
    const { style } = messageRef.current!;
    style.top = `${top}px`;
    style.left = `${left}px`;
  });

  const messageJsx = (
    <S.Message
      ref={messageRef}
      shown={shown}
      position={position}
      offset={offset}
    >
      {message}
    </S.Message>
  );

  return (
    <S.Tooltip
      className={className}
      inline={inline}
      ref={hostRef}
      onMouseOut={hide}
      onMouseOver={show}
    >
      {children}
      {presented && createPortal(messageJsx, document.body)}
    </S.Tooltip>
  );
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  className: '',
  inline: false,
  position: 'top',
  offset: 10,
};

export default Tooltip;
