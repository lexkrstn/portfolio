import React, { ReactElement, useEffect, useState } from 'react';
import TextwriterKeyframe from './TypewriterKeyframe';
import * as S from './styles';
import KeyframeAnimator from './KeyframeAnimator';

interface TypewriterProps {
  /**
   * Default delay before printing next portion of the text.
   */
  delay?: number;
  /**
   * Default number of milliseonds required to print 1 symbol.
   */
  printDuration?: number;
  /**
   * Default font size.
   */
  fontSize?: string;
  /**
   * Default number of milliseonds required to delete 1 symbol.
   */
  clearDuration?: number;
  /**
   * Keyframes.
   */
  keyframes: TextwriterKeyframe[];
}

/**
 * Displays series of text blocks character by character.
 */
export default function Typewriter({
  delay, printDuration, fontSize, clearDuration, keyframes,
}: TypewriterProps): ReactElement {
  const [text, setText] = useState('');
  const [textSize, setTextSize] = useState('');
  useEffect(() => {
    const animator = new KeyframeAnimator(keyframes, delay, printDuration, clearDuration);
    animator.setActionHandler(action => {
      if (action.type === 'print') {
        setText(prevText => `${prevText}${action.letter}`);
      } else if (action.type === 'delete') {
        setText(prevText => prevText.slice(0, prevText.length - 1));
      }
      setTextSize(action.keyframe.fontSize || fontSize);
    });
    animator.start();
    return () => {
      animator.destroy();
      setText('');
    };
  }, [delay, printDuration, fontSize, clearDuration, keyframes]);
  return (
    <S.Typewriter fontSize={textSize}>
      {text}
      <S.Caret />
    </S.Typewriter>
  );
}

Typewriter.defaultProps = {
  delay: 200,
  printDuration: 70,
  clearDuration: 15,
  fontSize: '1em',
};
