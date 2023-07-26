import React from 'react';
import styled, { keyframes } from "styled-components";
import resumePDF from '../../assets/resume/Resume_Lee Junwei.pdf'
import { GlobalStyles } from '../../components/Fonts/Fonts';
import AboutBg from '../../assets/aboutBG.png'
import { HomeBgImg, HomeContainer, ParentContainer } from '../Home/HomePageElements';

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(20deg) rotateZ(10deg);
    opacity: 1;
  }
`;

// export const AboutParentContainer = styled.div`
//     display: grid;
//     grid-template-columns: 1fr;
//     grid-template-rows: 1fr;
//     width: 100%;
//     height: 50vh;
// `;

export const ResumeContainer = styled.div`
    // position: absolute;
    // left: 0;

    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: left;
    text-align: left;
    background: rgba(0,0,0,0.5);
    width: 100%;
    color: #fff;
    align-items: left;
    height: 90vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 60px;
    padding: 20px;
    // border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    // border-radius: 25px 0 0 0;

    grid-row: 1;
    grid-column: 1;
    z-index: 2;

    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-left: 0px;
        border-top: none;
        border-left: none;
        padding: 0px;
    } 
`;

const ResumeContainerTitle = styled.div`
    color: #55B4B0;
    align-items: left;

    text-align: center;
    font-family: 'IBMPlexMonoBold', monospace;
    padding: 20px;
    font-size: 40px;
    font-weight: 500;

    /* Typing cursor animation */
    overflow: hidden; /* Hide overflowing characters */
    white-space: nowrap; /* Prevent text from wrapping */

    // border-right: 1px solid #55B4B0;

    /* Initially set the text to be invisible */
    visibility: visible;
    // border-right: 2px solid #fff;
    /* Add a class to set visibility to visible after the animation-delay has passed */
    &.visible {
        visibility: visible;
        
    }

    filter: drop-shadow(8px 5px green) sepia(60%) hue-rotate(90deg);

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        text-align: left;
        align-self: left;
        margin-right: 10px;
        padding: 10px;
    }
`;
  
const Resume = () => {
  const pdflink = "https://drive.google.com/file/d/1QeQm0LcSlfjTgE2V3MM4wfj12yfvp7IF/view?usp=drive_link";
  return (
    <ParentContainer style={{height: '100vh'}}>
      <GlobalStyles/>
      <HomeBgImg
        src={AboutBg}  className='Styling Hell'
      />
      <ResumeContainer>
        <ResumeContainerTitle $size="30px" $animationDelay="0s" >
            04. Work Experience 
        </ResumeContainerTitle>
      </ResumeContainer>
    </ParentContainer>
  );
};
  
export default Resume;