import React, { useState, useEffect, useRef } from 'react';
import { 
  AboutContainer,
  AboutLeftContainer,
  AboutParentContainer,
  AboutBgImg,
  ToolsContainer,
  AboutContainerTitle,
  AboutDescriptionContainer,
  AboutDescriptionText,
  RightContainerImg,
  ToolsTitle,
  ToolDescriptionText,
  ToolsDescriptionContainer,
} from './AboutElements';
import { FaPython, FaJava, FaDocker, FaReact, FaGithub, FaJs, FaCss3, FaUnity  } from 'react-icons/fa';
import { TbBrandCSharp, TbSql } from 'react-icons/tb';
import { BsTools } from "react-icons/bs";
import AboutBg from '../../assets/aboutBG.png'

const About = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const titleAnimated = useRef(false);
  const descriptionAnimated = useRef(false);
  const aboutTitleRef = useRef(null);
  const aboutDescriptionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.6]
    };

    const currentTitleRef = aboutTitleRef.current;
    const currentDescriptionRef = aboutDescriptionRef.current;

    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !titleAnimated.current) {
          setIsTitleVisible(true);
          titleAnimated.current = true;
          titleObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const descriptionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !descriptionAnimated.current) {
          setIsDescriptionVisible(true);
          descriptionAnimated.current = true;
          descriptionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (currentTitleRef) {
      titleObserver.observe(currentTitleRef);
    }
    if (currentDescriptionRef) {
      descriptionObserver.observe(currentDescriptionRef);
    }

    return () => {
      if (currentTitleRef) {
        titleObserver.unobserve(currentTitleRef);
      }
      if (currentDescriptionRef) {
        descriptionObserver.unobserve(currentDescriptionRef);
      }
    };
  }, []);

  return (
    <AboutParentContainer style={{height: '100vh'}}>
      <AboutBgImg
        src={AboutBg}
        className={isDescriptionVisible ? 'visible bg' : ''}
      />
      <AboutContainer>
        <AboutLeftContainer>
          <AboutContainerTitle 
            ref={aboutTitleRef} 
            $size="50px" 
            $animationDelay="0s" 
            className={isTitleVisible ? 'visible title' : ''}
          >
            ABOUT ME
          </AboutContainerTitle>
          
          <AboutDescriptionContainer 
            ref={aboutDescriptionRef} 
            $animationDelay="0s" 
            className={isDescriptionVisible ? 'visible description' : ''}
          >
            <AboutDescriptionText $inputColor="#b8b8b8" >
              Hello! My name is Junwei and I enjoy creating things that live on the internet. 
              You can find me tinkering with new frameworks and languages, at the gym or just chilling.
              I'm always looking for new opportunities to learn and grow!
            </AboutDescriptionText>

            <ToolsContainer className={isTitleVisible ? 'visible' : ''} $border="none" $borderRadius="20px" > 
              <ToolsTitle $inputColor="#fff" $size="60px" $animationDelay="0s" 
                className={isTitleVisible ? 'visible front-face' : ''}>
                <BsTools style={{height: 'auto', width: '30px', marginRight: '20px'}}/> 
                Tools 
                <BsTools style={{marginLeft: '20px', height: 'auto', width: '30px'}}/>
              </ToolsTitle>
            </ToolsContainer>

            <div className="back-face">
              <ToolDescriptionText $inputColor="#5f7c96">
                <ToolsDescriptionContainer $flexBasis="calc(25% - 20px)">
                  <FaPython style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/>Python
                </ToolsDescriptionContainer >
                <ToolsDescriptionContainer>
                  <FaJava style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/> Java
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer >
                  <TbSql style={{
                      height: 'auto',
                      width: '50px',
                    }}/>
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer >
                  <FaDocker style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/> Docker
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer >
                  <FaReact style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/> React
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer  >
                  <FaJs  style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/>Javascript
                </ToolsDescriptionContainer >
                <ToolsDescriptionContainer >
                  <FaGithub style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/> Git
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer >
                  <TbBrandCSharp style={{
                      height: 'auto',
                      width: '50px'}}/>
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer >
                  <FaUnity style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/> Unity
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer >
                  <FaCss3 style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '50px'
                    }}/> CSS
                </ToolsDescriptionContainer>
              </ToolDescriptionText>
            </div>
          </AboutDescriptionContainer>
        </AboutLeftContainer>
      </AboutContainer>
    </AboutParentContainer>
  );
};

export default About;
