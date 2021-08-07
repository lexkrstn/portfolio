import React, { ReactElement, useRef } from 'react';
import GradientBackground from '../../widgets/GradientBackground';
import Slider from '../../widgets/Slider';
import Image from '../../widgets/Image';
import Appeal from '../Appeal';
import { actions, selectors } from '../duck';
import * as S from './styles';

export default function Work(): ReactElement {
  const imageCache = useRef<Record<string, string>>({});
  const images = [
    '/images/portfolio/tms.jpg',
    '/images/portfolio/socket.png',
    '/images/portfolio/vpnmgr.png',
  ];
  return (
    <S.Work>
      <GradientBackground />
      <S.Container>
        <S.Box>
          <S.Title>Theatre Management System</S.Title>
          <S.Brief>
            Open Source web chat platform developed as UI/UX Javascript Specialist
            at Konecty → Rocket.Chat.
          </S.Brief>
          <Slider>
            {images.map(image => (
              <Image
                key={image}
                src={image}
                alt="Theatre Management System"
                aspect={2}
                cache={imageCache.current}
              />
            ))}
          </Slider>
          <S.Section>
            <S.Heading>About this project</S.Heading>
            <S.Divider />
            <S.Para>
                On this Open Source project I was responsible for the initial UI/UX
                architecture, structure, design and animations.
                The idea was to follow the 3 column UX trend of webchats like skype,
                hipchat, gitter and slack. Building upon that an Open Source alternative
                with similar functionalities.
              </S.Para>
              <S.Para>
                The UI/UX was conceived with a mobile first approach. So it would
                be possible to effortlessly launch it into any platform without
                making any changes to the main application.
              </S.Para>
          </S.Section>
          <S.Section>
            <S.Heading>Technical Sheet</S.Heading>
            <S.Subheading>
              Code technologies I got involved with while working on this project.
            </S.Subheading>
            <S.Divider />
            <S.List>
              <S.Item>UI/UX Design</S.Item>
              <S.Item>UI/UX Architecture</S.Item>
              <S.Item>CSS3 – preprocessed with LESS + LESSHAT</S.Item>
              <S.Item>Blaze</S.Item>
              <S.Item>MongoDB</S.Item>
            </S.List>
          </S.Section>
          <S.Section>
            <S.Heading>Resources</S.Heading>
            <S.Divider />
            <S.List>
              <S.Item>
                The project is online at <S.Link href="#">HTTPS://ROCKET.CHAT</S.Link>
              </S.Item>
              <S.Item>Access the project's source on <S.Link href="#">GITHUB</S.Link></S.Item>
            </S.List>
          </S.Section>
        </S.Box>
        <Appeal />
      </S.Container>
    </S.Work>
  );
}
