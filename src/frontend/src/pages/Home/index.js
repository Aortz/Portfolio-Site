import React, { useEffect, useState, useRef } from 'react';
import { 
  HomeContainer, 
  HomeContainerTitle, 
  HomeContainerText,
  HomeContainerDescription,
  MobileHomeImg,
  HomeBgImg,
  ParentContainer,
  Cursor
} from './HomePageElements';
import HomeImg from '../../assets/home-img.png'
import HomeBg from '../../assets/homeBG.png'
import styled, { keyframes } from 'styled-components';
import About from '../About/about';
import Project from '../Project/project';
import Resume from '../Resume/resume';
import {
  repos,
} from "../../editable-stuff/config.js";

 
const SelectableText = styled.span`
  cursor: pointer;
`;

const Home = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  // Create a ref for the AboutContainerTitle element
  const aboutTitleRef = useRef(null);

  // Create a ref for the AboutDescriptionContainer element
  const aboutDescriptionRef = useRef(null);

  // Intersection Observer to track the AboutParentContainer
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: [0, 0.5], // Trigger when component enters and exits the viewport
    };

    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Title component is now visible
          setIsTitleVisible(true);
          console.log("Title Visible");
        } else {
          // Title component is not visible (scrolled out of the viewport)
          setIsTitleVisible(false);
          console.log("Title not visible");
        }
      });
    }, observerOptions);

    // Start observing the AboutParentContainer element
    if (aboutTitleRef.current) {
      titleObserver.observe(aboutTitleRef.current);
    }

    // Observer for the description component
    const descriptionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Description component is now visible
          setIsDescriptionVisible(true);
          console.log("Description Visible");
        } else {
          // Description component is not visible (scrolled out of the viewport)
          setIsDescriptionVisible(false);
          console.log("Description not Visible");
        }
      });
    }, observerOptions);

    // Start observing the description element
    if (aboutDescriptionRef.current) {
      descriptionObserver.observe(aboutDescriptionRef.current);
    }

    // For Component1, set the text to be visible after the animation-delay
    const timer1 = setTimeout(() => {
      setIsVisible1(true);
    }, 0); // Set the delay time in milliseconds (e.g., 1s for Component1)

    // For Component2, set the text to be visible after the animation-delay
    const timer2 = setTimeout(() => {
      setIsVisible2(true);
    }, 2000); // Set the delay time in milliseconds (e.g., 2s for Component2)

    // Clean up the observers
    return () => {
      if (aboutTitleRef.current) {
        titleObserver.unobserve(aboutTitleRef.current);
      }
      if (aboutDescriptionRef.current) {
        descriptionObserver.unobserve(aboutDescriptionRef.current);
      }
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);



  // useEffect(() => {
  //   // For Component1, set the text to be visible after the animation-delay
  //   const timer1 = setTimeout(() => {
  //     setIsVisible1(true);
  //   }, 0); // Set the delay time in milliseconds (e.g., 1s for Component1)

  //   // For Component2, set the text to be visible after the animation-delay
  //   const timer2 = setTimeout(() => {
  //     setIsVisible2(true);
  //   }, 2000); // Set the delay time in milliseconds (e.g., 2s for Component2)

  //   // Clear the timeouts when the component unmounts or when the animations are complete
  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


  return (
    <ParentContainer style={{height: '100vh'}}>
      <HomeBgImg
        src={HomeBg}
        ref={aboutDescriptionRef}
        className={isDescriptionVisible ? 'visible bg' : ''} 
      />
      <HomeContainer>
        <HomeContainerTitle ref={aboutTitleRef} className={isTitleVisible ? 'visible title' : ''}>
          Hi, my name is
        </HomeContainerTitle >
        <HomeContainerText $size="80px" $animationDelay="0s" className={isVisible1 ? 'visible name' : ''}>
          Lee Junwei. 
        </HomeContainerText >
        <HomeContainerText $inputColor="#5f7c96" $animationDelay="2s" className={isVisible2 ? 'visible role' : ''}>
          Software Engineer | Student 
          <Cursor $inputColor="#5f7c96"/>
        </HomeContainerText>
        <HomeContainerDescription $inputColor="#b8b8b8" >
          <p>
          I am a software engineer greatly interested in learning how to build digital experiences.
          </p>
          <p>
            Currently taking an interest in exploring AI/ML as well as metaverse technologies
          </p>
        </HomeContainerDescription>
        <MobileHomeImg
            src={HomeImg}
          />
      </HomeContainer>
      <About className={isVisible ? 'animate' : ''} />
        {/* Element you want to track */}
      <Project
          heading={repos.heading}
          username={repos.gitHubUsername}
          length={repos.reposLength}
          specfic={repos.specificRepos}
      />
      <div ref={elementRef}>
        {/* Element you want to track */}
        <Resume/>
      </div>
    </ParentContainer>
  );
};
  
export default Home;