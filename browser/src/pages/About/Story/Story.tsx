import React, { FC } from 'react';
import * as S from './styles';

const Story: FC = () => (
  <>
    <S.Para>
      I am a seasoned software engineer with over a decade of experience in
      developing high-quality web applications and systems. My expertise spans
      backend and frontend development, utilizing modern frameworks and tools
      to build scalable, efficient, and user-friendly solutions.
    </S.Para>
    <S.Para>
      Throughout my career, I have successfully led and contributed to a wide
      range of projects, including b2b platforms, e-commerce solutions and
      web-based system tools across various industries. I specialize in creating
      robust architectures and implementing clean, maintainable code to ensure
      long-term scalability and performance.
    </S.Para>
    {/*<S.PostScriptum>*/}
    <S.Para>
      I thrive on solving complex technical challenges, continuously learning
      new technologies, and mentoring team members to achieve their full
      potential. My passion for software development drives me to stay at the
      forefront of industry trends and deliver impactful solutions that meet and
      exceed business objectives.
    </S.Para>
  </>
);

Story.displayName = 'Story';

export default Story;
