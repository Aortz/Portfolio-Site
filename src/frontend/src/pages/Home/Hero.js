import React, { useEffect, useState } from 'react';
import {
  HomeContainer,
  HomeContent,
  HomeContainerTitle,
  HomeContainerText,
  HomeContainerDescription,
  Cursor,
} from './HomePageElements';
import { useLayout } from '../../layout/LayoutContext';

/* Hero copy only. In page mode it's wrapped by Home/index.js; in world mode
   the SectionDock renders it directly on the HOME platform. */
const Hero = () => {
  const { docked } = useLayout();
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
    <HomeContainer id="home" $docked={docked}>
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
    </HomeContainer>
  );
};

export default Hero;
