import React, { useEffect, useState } from 'react';
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
import Resume from '../resume';

 
const SelectableText = styled.span`
  cursor: pointer;
`;

const Home = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const [selectedText, setSelectedText] = useState('');

  const handleSelect = (event) => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
  };



  useEffect(() => {
    // For Component1, set the text to be visible after the animation-delay
    const timer1 = setTimeout(() => {
      setIsVisible1(true);
    }, 0); // Set the delay time in milliseconds (e.g., 1s for Component1)

    // For Component2, set the text to be visible after the animation-delay
    const timer2 = setTimeout(() => {
      setIsVisible2(true);
    }, 2000); // Set the delay time in milliseconds (e.g., 2s for Component2)

    // Clear the timeouts when the component unmounts or when the animations are complete
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <ParentContainer style={{height: '100vh'}}>
      <HomeBgImg
        src={HomeBg} 
      />
      <HomeContainer>
        <HomeContainerTitle>
          Hi, my name is
        </HomeContainerTitle>
        <HomeContainerText $size="80px" $animationDelay="0s" className={isVisible1 ? 'visible name' : ''}>
          Lee Junwei. 
        </HomeContainerText>
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
      <About/>
      <Resume/>
    </ParentContainer>
  );
};
  
export default Home;