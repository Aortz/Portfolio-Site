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
import About from '../About/about';
import Project from '../Project/project';
import ResumeSection from '../Resume/resume';
import VerticalNavbar from '../../components/NavBar/VerticalNavbar';

const Home = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isBgVisible, setIsBgVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible1(true), 0);
    const t2 = setTimeout(() => setIsVisible2(true), 2000);
    const t3 = setTimeout(() => setIsBgVisible(true), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      <ParentContainer style={{ minHeight: '100vh' }}>
        <VerticalNavbar />
        <HomeBgImg
          src={HomeBg}
          className={isBgVisible ? 'visible' : ''}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="600"
          height="400"
        />
        <HomeContainer id="home">
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
      <About />
      <Project />
      <ResumeSection />
    </>
  );
};

export default Home;
