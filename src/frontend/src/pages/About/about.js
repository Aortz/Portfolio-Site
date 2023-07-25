import React, { useEffect, useState } from 'react';
import { 
  AboutContainer,
  AboutLeftContainer,
  AboutRightContainer,
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
import RightImg from '../../assets/right-img.png'

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
    <AboutContainer>
      <AboutLeftContainer>
        <AboutContainerTitle $size="30px" $animationDelay="0s" className={isVisible ? 'visible' : ''}>
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
          <ToolsContainer className={isVisible ? 'visible' : ''} $background="#55B4B0" $border="1px solid #000" $borderRadius="20px">
            <ToolsTitle  $inputColor="#fff" $size="30px" $animationDelay="0s" className={isVisible ? 'visible front-face' : ''}>
              Tools <BsTools style={{
                      marginRight: '10px',
                      height: 'auto',
                      width: '20px'
                    }}/>
            </ToolsTitle>
            <div className="back-face">
              <ToolDescriptionText $inputColor="#5f7c96">
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000" >
                  <FaPython style={{
                      marginRight: '10px',
                    }}/>Python
                </ToolsDescriptionContainer >
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <FaJava /> Java
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <TbSql style={{
                      height: 'auto',
                      width: '20px',
                    }}/>
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <FaDocker style={{
                      marginRight: '10px',
                    }}/> Docker
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <FaReact style={{
                      marginRight: '10px',
                    }}/> React
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000" >
                  <FaJs  style={{
                      marginRight: '10px',
                    }}/>Javascript
                </ToolsDescriptionContainer >
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <FaGithub style={{
                      marginRight: '10px',
                    }}/> Git
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <TbBrandCSharp/>
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <FaUnity style={{
                      marginRight: '10px',
                    }}/> Unity
                </ToolsDescriptionContainer>
                <ToolsDescriptionContainer $alignItems="center" $background="#000" $flexDirection="start" $border="1px solid #000">
                  <FaCss3 style={{
                      marginRight: '10px',
                    }}/> CSS
                </ToolsDescriptionContainer>
              </ToolDescriptionText>
            </div>
          </ToolsContainer>
        </AboutDescriptionContainer>
      </AboutLeftContainer>
      <AboutRightContainer>
        <RightContainerImg
          src={RightImg}
        />
        
      </AboutRightContainer>
    </AboutContainer>
  );
};

export default About;
