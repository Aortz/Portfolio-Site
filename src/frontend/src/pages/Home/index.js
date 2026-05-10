import React, { useEffect, useState } from 'react';
import {
  HomeContainer,
  HomeContainerTitle,
  HomeContainerText,
  HomeContainerDescription,
  HomeBgImg,
  ParentContainer,
  Cursor,
} from './HomePageElements';
import HomeBg from '../../assets/homeBG.png';

const Home = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isBgVisible, setIsBgVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible1(true), 0);
    const timer2 = setTimeout(() => setIsVisible2(true), 2000);
    const timer3 = setTimeout(() => setIsBgVisible(true), 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <ParentContainer style={{ height: '100vh' }}>
      <HomeBgImg
        src={HomeBg}
        className={isBgVisible ? 'visible' : ''}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="600"
        height="400"
      />
      <HomeContainer>
        <HomeContainerTitle>Hi, my name is</HomeContainerTitle>
        <HomeContainerText
          $animationDelay="0s"
          className={isVisible1 ? 'visible name' : ''}
        >
          Junwei
        </HomeContainerText>
        <HomeContainerText
          $animationDelay="1.8s"
          className={isVisible2 ? 'visible role' : ''}
        >
          Software Engineer
          <Cursor />
        </HomeContainerText>
        <HomeContainerDescription>
          <p>
            I build full-stack web apps, with a current focus on AI/ML systems
            and developer tooling.
          </p>
          <p>
            Outside of work I&apos;m exploring 3D web experiences with React
            Three Fiber.
          </p>
        </HomeContainerDescription>
      </HomeContainer>
    </ParentContainer>
  );
};

export default Home;
