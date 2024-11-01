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
          // console.log("Title Visible");
        } else {
          // Title component is not visible (scrolled out of the viewport)
          setIsTitleVisible(false);
          // console.log("Title not visible");
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
          // console.log("Description Visible");
        } else {
          // Description component is not visible (scrolled out of the viewport)
          setIsDescriptionVisible(false);
          // console.log("Description not Visible");
        }
      });
    }, observerOptions);

    // Start observing the description element
    if (aboutDescriptionRef.current) {
      descriptionObserver.observe(aboutDescriptionRef.current);
    }

    // Clean up the observers
    return () => {
      if (aboutTitleRef.current) {
        titleObserver.unobserve(aboutTitleRef.current);
      }
      if (aboutDescriptionRef.current) {
        descriptionObserver.unobserve(aboutDescriptionRef.current);
      }
    };
  }, []);


  return (
    <AboutParentContainer style={{height: '100vh'}}>
      <AboutBgImg
        src={AboutBg}
        // ref={aboutDescriptionRef}
        className={isDescriptionVisible ? 'visible bg' : ''}
      />
      <AboutContainer>
        <AboutLeftContainer>
          <AboutContainerTitle ref={aboutTitleRef} $size="50px" $animationDelay="0s" className={isTitleVisible ? 'visible title' : 'invisible'}>
            ABOUT ME
          </AboutContainerTitle>
          <AboutDescriptionContainer ref={aboutDescriptionRef} $animationDelay="0s" className={isDescriptionVisible ? 'visible description' : ''}>
            {/* <AboutContainerText $size="20px">
              Lee Junwei. 
            </AboutContainerText> */}
            <AboutDescriptionText $inputColor="#b8b8b8" >
              Hello! My name is Junwei and I enjoy creating things that live on the internet. My interest in web development started back in 2015 when I decided to try making a custom website for my
              schools orientation. Now I enjoy playing around with new frameworks and languages!
            </AboutDescriptionText>
            {/* <AboutDescriptionText $inputColor="#5f7c96" >
              Since then, I have dabbled in many more technology and languages
            </AboutDescriptionText> */}
            {/* $background="#55B4B0" */}
            <ToolsContainer className={isTitleVisible ? 'visible' : ''} $border="none" $borderRadius="20px" > 
              <ToolsTitle  $inputColor="#fff" $size="60px" $animationDelay="0s" className={isTitleVisible ? 'visible front-face' : ''}>
                <BsTools style={{
                    height: 'auto',
                    width: '30px'
                  }}/> Tools <BsTools style={{
                    marginRight: '10px',
                    height: 'auto',
                    width: '30px'
                  }}/>
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
        {/* <AboutRightContainer>
          <RightContainerImg
            src={RightImg}
          />
        </AboutRightContainer> */}
      </AboutContainer>
    </AboutParentContainer>
  );
};

export default About;
