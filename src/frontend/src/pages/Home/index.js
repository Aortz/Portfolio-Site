import React, { useEffect, useState, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isBgVisible, setIsBgVisible] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  
  const homeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset all animations
            setIsVisible(false);
            setIsTyping(false);
            setIsBgVisible(false);
            setIsDescVisible(false);
            
            // Trigger animations with delays
            setTimeout(() => setIsVisible(true), 300);
            setTimeout(() => setIsTyping(true), 1000);
            setTimeout(() => setIsBgVisible(true), 1000);
            setTimeout(() => setIsDescVisible(true), 1500);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
    };
  }, []);

  return (
    <ParentContainer style={{height: '100vh'}}>
      <HomeBgImg
        src={HomeBg}
        className={isBgVisible ? 'visible' : ''} 
        alt="Background"
      />
      <HomeContainer ref={homeRef}>
        <HomeContainerTitle className={isVisible ? 'visible' : ''}>
          Hi, my name is
        </HomeContainerTitle>
        <HomeContainerText 
          $size="80px" 
          $animationDelay="0s" 
          className={`name ${isTyping ? 'typing' : ''}`}
        >
          Junwei 
        </HomeContainerText>
        <HomeContainerText 
          $inputColor="#5f7c96" 
          $animationDelay="1s" 
          className={`${isTyping ? 'typing' : ''} role`}
        >
          Software Engineer | Coder | Gymrat
          <Cursor $inputColor="#5f7c96"/>
        </HomeContainerText>
        <HomeContainerDescription 
          $inputColor="#b8b8b8"
          className={isDescVisible ? 'visible' : ''}
        >
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