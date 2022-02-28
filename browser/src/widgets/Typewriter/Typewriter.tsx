import React, { ReactElement, useEffect, useState } from 'react';
import TextwriterKeyframe from './TypewriterKeyframe';
import * as S from './styles';
import KeyframeAnimator from './KeyframeAnimator';
import Timeout from './Timeout';

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
  /**
   * After this period of inactivity the caret is hidden.
   */
  caretTimeout?: number;
}

/**
 * Displays series of text blocks character by character.
 */
export default function Typewriter({
  delay, printDuration, fontSize, clearDuration, keyframes, caretTimeout,
}: TypewriterProps): ReactElement {
  const [text, setText] = useState('');
  const [textSize, setTextSize] = useState('');
  const [caretVisible, setCaretVisible] = useState(true);
  useEffect(() => {
    const animator = new KeyframeAnimator(keyframes, delay, printDuration, clearDuration);
    const caretVisibilityTimeout = new Timeout(caretTimeout);
    caretVisibilityTimeout.setTimeoutListener(() => setCaretVisible(false));
    animator.setActionHandler(action => {
      if (action.type === 'print') {
        setText(prevText => `${prevText}${action.letter}`);
      } else if (action.type === 'delete') {
        setText(prevText => prevText.slice(0, prevText.length - 1));
      }
      setTextSize(action.keyframe.fontSize || fontSize);
      setCaretVisible(true);
      caretVisibilityTimeout.reset();
    });
    animator.start();
    return () => {
      animator.destroy();
      setText('');
    };
  }, [delay, printDuration, fontSize, clearDuration, keyframes]);
  return (
    <S.Typewriter fontSize={textSize}>
      {text.split('').map((c, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.Character key={`${c}${i}`}>{c}</S.Character>
      ))}
      {caretVisible && <S.Caret />}
    </S.Typewriter>
  );
}

Typewriter.defaultProps = {
  caretTimeout: 2000,
  delay: 200,
  printDuration: 70,
  clearDuration: 15,
  fontSize: '1em',
} as TypewriterProps;
