import React, { useEffect, useState, Suspense, lazy } from 'react';
import {
  HomeContainer,
  HomeContainerTitle,
  HomeContainerText,
  HomeContainerDescription,
  ParentContainer,
  Cursor,
} from './HomePageElements';
import About from '../About/about';
import Project from '../Project/project';
import ResumeSection from '../Resume/resume';
import AxisDivider from '../../components/AxisDivider';

// Lazy-load the 3D hero accent so three.js + drei live in their own chunk.
const HeroAccent = lazy(() => import('../../components/HeroAccent'));

const Home = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible1(true), 0);
    const t2 = setTimeout(() => setIsVisible2(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <ParentContainer style={{ minHeight: '100vh' }}>
        <Suspense fallback={null}>
          <HeroAccent />
        </Suspense>
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
            Software Engineer · Robotics Simulation
            <Cursor />
          </HomeContainerText>
          <HomeContainerDescription>
            <p>
              I&apos;m a software engineer focused on robotics simulation —
              I build the systems that let researchers and engineers iterate
              on perception, planning, and control without leaving their
              browser.
            </p>
            <p>
              Lately I&apos;ve been gluing React Three Fiber to ROS-adjacent
              tooling: real-time scene rendering, sensor visualization, and
              the kind of dev-loop tooling that turns &ldquo;ssh into the lab
              machine&rdquo; into &ldquo;open a tab.&rdquo; Most of it ends up
              looking like a CAD app that fights back.
            </p>
            <AxisDivider />
            <p>
              Off the keyboard I&apos;m at the gym, deep in a 3D modelling
              rabbit hole, or breaking my own setup chasing the next stack.
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
