import React, { FC } from 'react';
import * as S from './styles';

const Story: FC = () => (
  <>
    <S.Para>
      I am a seasoned backend software engineer with a decade of experience delivering
      high-quality web applications and system-level solutions. My work focuses
      on designing and optimizing high-load, data-intensive platforms with an
      emphasis on scalability, performance, and reliability. Beyond engineering,
      I conduct research in maritime pathfinding algorithms, applying AI techniques
      and large-scale AIS data analysis to develop efficient, real-world vessel
      routing models. I specialize in building scalable, data-driven, and
      performance-oriented systems.
    </S.Para>
    <S.Para>
      Throughout my career, I have successfully led and contributed to a wide range
      of projects, including B2B platforms, e-commerce solutions, maritime shipping
      and routing platforms, and Theatre Management Systems which automate devices
      like digital projectors, sound processors, promotion and lobby screens, and
      other equipment essential for operating modern cinema environments. I specialize
      in designing robust architectures and implementing clean, maintainable code
      that ensures long-term scalability, high performance, and reliability across
      diverse industries.
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
