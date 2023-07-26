import React, { useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // For Component1, set the text to be visible after the animation-delay
    const timer1 = setTimeout(() => {
      setIsVisible(true);
    }, 0); // Set the delay time in milliseconds (e.g., 1s for Component1)

    // Clear the timeouts when the component unmounts or when the animations are complete
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <AboutParentContainer style={{height: '100vh'}}>
      <AboutBgImg
        src={AboutBg}  className='Styling Hell'
      />
      <AboutContainer>
        <AboutLeftContainer>
          <AboutContainerTitle $size="30px" $animationDelay="0s" className={isVisible ? 'visible title' : ''}>
            02. About Me 
          </AboutContainerTitle>
          <AboutDescriptionContainer>
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
            <ToolsContainer className={isVisible ? 'visible' : ''} $border="none" $borderRadius="20px" > 
              <ToolsTitle  $inputColor="#fff" $size="40px" $animationDelay="0s" className={isVisible ? 'visible front-face' : ''}>
                <BsTools style={{
                    height: 'auto',
                    width: '20px'
                  }}/> Tools <BsTools style={{
                    marginRight: '10px',
                    height: 'auto',
                    width: '20px'
                  }}/>
              </ToolsTitle>
            </ToolsContainer>
            <div className="back-face">
                <ToolDescriptionText $inputColor="#5f7c96">
                  <ToolsDescriptionContainer>
                    <FaPython style={{
                        marginRight: '10px',
                      }}/>Python
                  </ToolsDescriptionContainer >
                  <ToolsDescriptionContainer>
                    <FaJava /> Java
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
                      }}/> Docker
                  </ToolsDescriptionContainer>
                  <ToolsDescriptionContainer >
                    <FaReact style={{
                        marginRight: '10px',
                      }}/> React
                  </ToolsDescriptionContainer>
                  <ToolsDescriptionContainer  >
                    <FaJs  style={{
                        marginRight: '10px',
                      }}/>Javascript
                  </ToolsDescriptionContainer >
                  <ToolsDescriptionContainer >
                    <FaGithub style={{
                        marginRight: '10px',
                      }}/> Git
                  </ToolsDescriptionContainer>
                  <ToolsDescriptionContainer >
                    <TbBrandCSharp style={{
                        height: 'auto',
                        width: '40px'}}/>
                  </ToolsDescriptionContainer>
                  <ToolsDescriptionContainer >
                    <FaUnity style={{
                        marginRight: '10px',
                      }}/> Unity
                  </ToolsDescriptionContainer>
                  <ToolsDescriptionContainer >
                    <FaCss3 style={{
                        marginRight: '10px',
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
