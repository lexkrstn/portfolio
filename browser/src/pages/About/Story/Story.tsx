import React, { FC } from 'react';
import * as S from './styles';

const Story: FC = () => (
  <>
    <S.Para>
      Since beginning my journey as a freelance developer nearly 10
      years ago, I’ve engaged in remote work for agencies, provided
      consultations for startups, and collaborated with talented individuals to
      create web products for business and consumer use.
    </S.Para>
    <S.Para>
      My expertise lies in microservice and SPA development, encompassing both
      server-side and client-side aspects. While I excel in server-side
      operations to ensure functionality under high load, I turn to professional
      designers for UI/UX styling.
    </S.Para>
    <S.PostScriptum>
      BTW, if you're wondering what C++ is doing in my skills... Well, I can tell
      you 😃 Before becoming a web developer I couldn&apos;t see myself as
      anyone other than a 3d programmer. I even devoted several years after my
      2nd year in the university entirely to developing a gamedev start-up.
      During that period I had to make a living as a freelance web developer too,
      and, eventually, I realized that I loved my part-time job as much
      as I loved 3d programming. So, in the next decade, I was gradually
      moving from e-commerce projects using CMS to framework-based
      website development, both back-end and front-end.
    </S.PostScriptum>
  </>
);

Story.displayName = 'Story';

export default Story;
