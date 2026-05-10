import React, { useEffect, useState, Suspense, lazy } from 'react';
import {
  HomeContainer,
  HomeContent,
  HomeAccentSlot,
  HomeContainerTitle,
  HomeContainerText,
  HomeContainerDescription,
  ParentContainer,
  Cursor,
} from './HomePageElements';
import About from '../About/about';
import Project from '../Project/project';
import Gallery from '../Gallery';
import ResumeSection from '../Resume/resume';

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
        <HomeContainer id="home">
          <HomeContent>
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
                I&apos;m a software engineer exploring{' '}
                <strong>Unreal Engine</strong> for robotics — building immersive
                3D environments where perception, planning, and control systems
                can be prototyped end-to-end before they ever touch hardware.
              </p>
              <p>
                Outside the engine I&apos;m deep in 3D modelling pipelines:
                Blender for asset prep, AirSim and React Three Fiber for sim
                runtimes, and the in-between glue that keeps a CAD-driven
                workflow from feeling like five separate tools.
              </p>
            </HomeContainerDescription>
          </HomeContent>
          <HomeAccentSlot>
            <Suspense fallback={null}>
              <HeroAccent />
            </Suspense>
          </HomeAccentSlot>
        </HomeContainer>
      </ParentContainer>
      <About />
      <Project />
      <Gallery />
      <ResumeSection />
    </>
  );
};

export default Home;
