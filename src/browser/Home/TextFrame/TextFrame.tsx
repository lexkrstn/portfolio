import React, { ReactElement } from 'react';
import * as S from './styles';

export default class TextFrame extends React.Component {
  public render(): ReactElement {
    return (
      <S.TextFrame>
        <S.Svg>
          <S.Text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
            Hi there!
          </S.Text>
        </S.Svg>
      </S.TextFrame>
    );
  }
}
