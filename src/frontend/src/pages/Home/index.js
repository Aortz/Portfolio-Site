import React, { useEffect, useState } from 'react';
import { 
  HomeContainer, 
  HomeContainerTitle, 
  HomeContainerText,
  HomeContainerDescription,
  HomeBgImg,
  ParentContainer,
  Cursor
} from './HomePageElements';
import HomeBg from '../../assets/homeBG.png'
import About from '../About/about';
import Project from '../Project/project';
import {
  repos,
} from "../../editable-stuff/config.js";

const Home = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isBgVisible, setIsBgVisible] = useState(false);

  useEffect(() => {
    // Component visibility timers
    const timer1 = setTimeout(() => setIsVisible1(true), 0);
    const timer2 = setTimeout(() => setIsVisible2(true), 2000);
    const timer3 = setTimeout(() => setIsBgVisible(true), 500); // Adjust timing as needed

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <ParentContainer style={{height: '100vh'}}>
      <HomeBgImg
        src={HomeBg}
        className={isBgVisible ? 'visible' : ''} 
        alt="Background"
      />
      <HomeContainer>
        <HomeContainerTitle>
          Hi, my name is
        </HomeContainerTitle>
        <HomeContainerText $size="80px" $animationDelay="0s" className={isVisible1 ? 'visible name' : ''}>
          Junwei 
        </HomeContainerText>
        <HomeContainerText $inputColor="#5f7c96" $animationDelay="2s" className={isVisible2 ? 'visible role' : ''}>
          Software Engineer | Coder | Gymrat
          <Cursor $inputColor="#5f7c96"/>
        </HomeContainerText>
        <HomeContainerDescription $inputColor="#b8b8b8">
          <p>
            I am a software engineer greatly interested in learning how to build digital experiences.
          </p>
          <p>
            Currently taking an interest in exploring AI/ML as well as metaverse technologies
          </p>
        </HomeContainerDescription>
      </HomeContainer>
      <About />
      <Project
        heading={repos.heading}
        username={repos.gitHubUsername}
        length={repos.reposLength}
        specfic={repos.specificRepos}
      />
    </ParentContainer>
  );
};
  
export default Home;