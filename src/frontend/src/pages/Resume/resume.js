import React, { useState } from 'react';
// import styled, { keyframes } from "styled-components";
import resumePDF from '../../assets/resume/Resume_Lee Junwei.pdf'
import { GlobalStyles } from '../../components/Fonts/Fonts';
import AboutBg from '../../assets/aboutBG.png'
import { ParentContainer } from '../Home/HomePageElements';
import { ResumeBgImg, ResumeContainer, ResumeContainerTitle, TreasureMapRoute, PitStop, ExpandedPitStop, DottedLine, expandAnimation } from './ResumeElements';
import PlaceIcon from '@mui/icons-material/Place';

const Resume = () => {
  const pdflink = "https://drive.google.com/file/d/1QeQm0LcSlfjTgE2V3MM4wfj12yfvp7IF/view?usp=drive_link";
  const [expandedPitStop, setExpandedPitStop] = useState(null);

  const handlePitStopClick = (index) => {
    if (expandedPitStop === index) {
      setExpandedPitStop(null);
    } else {
      setExpandedPitStop(index);
    }
  };

  return (
    <ParentContainer style={{height: '100vh'}}>
      <GlobalStyles/>
      {/* <ResumeBgImg
        src={AboutBg} className='Styling Hell'
      /> */}
      <ResumeContainer>
        <ResumeContainerTitle $size="60px" $animationDelay="0s" >
           WORK EXPERIENCE 
        </ResumeContainerTitle>
        <TreasureMapRoute>
          <PitStop style={{ top: '350px', left: '250px' }} onClick={() => handlePitStopClick(0)}>
            <PlaceIcon style={{ color: "red", height: '60px', width: '60px' }}/>
          </PitStop>
          <PitStop style={{ top: '200px', left: '350px' }} onClick={() => handlePitStopClick(1)} >
            <PlaceIcon style={{ color: "red", height: '60px', width: '60px' }}/>
          </PitStop>
          <PitStop style={{ top: '250px', left: '550px' }} onClick={() => handlePitStopClick(2)} >
            <PlaceIcon style={{ color: "red", height: '60px', width: '60px' }}/>
          </PitStop>
          <PitStop style={{ top: '190px', left: '750px' }} onClick={() => handlePitStopClick(3)} >
            <PlaceIcon style={{ color: "red", height: '60px', width: '60px' }}/>
          </PitStop>
          <PitStop style={{ top: '270px', left: '850px' }} onClick={() => handlePitStopClick(4)} >
            <PlaceIcon style={{ color: "red", height: '60px', width: '60px' }}/>
          </PitStop>
          
          
          {expandedPitStop !== null && (
            <ExpandedPitStop
                style={{ top: `${expandedPitStop * 50 + 20}px`, left: `${expandedPitStop * 200 + 200}px` }}
                onClick={() => handlePitStopClick(expandedPitStop)}
              >
              Expanded Pit Stop {expandedPitStop + 1}
            </ExpandedPitStop>
          )}

          {/* {expandedPitStop !== null && (
            <DottedLine $top={75} $left={125} $width={175 * (expandedPitStop + 1)} />
          )} */}
        </TreasureMapRoute>
      </ResumeContainer>
    </ParentContainer>
  );
};
  
export default Resume;