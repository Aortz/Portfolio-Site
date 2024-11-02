import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
import { FaGithub, FaDownload } from "react-icons/fa";
import styled, { keyframes } from 'styled-components';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


// Helper function to calculate steps based on the text length
function typingAnimationWithSteps(text) {
    const textLength = text ? text.toString().length : 0;
    return keyframes`
      from {
        width: 0;
      }
      to {
        width: ${textLength+1}ch;
      }
    `;
}

const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideRightAnimation = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const rotateAnimation = keyframes`
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {0
    -webkit-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
`;

const glitchAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(2px, -2px);
  }
  50% {
    transform: translate(-2px, 2px);
  }
  75% {
    transform: translate(2px, 0);
  }
  100% {
    transform: translate(0);
  }
`;

export const ProjectContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    background: #000;
    width: 100%;
    color: #fff;
    min-height: 100vh;
    margin-left: 80px;
    padding: 20px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    @media screen and (max-width: 768px) {
      padding: 10px;
      margin-left: 0px;
      border-left: 0px solid #ccc;
    }
`;

export const ContainerTitle = styled.div`
    align-items: left;
    
    text-align: left;
    font-family: 'IBMPlexMonoBold', monospace;
    // padding: 20px;
    font-weight: 500;
    color: ${props => props.$inputColor || "#55B4B0"};
    font-size: ${props => props.$size || "40px"};

    /* Typing cursor animation */
    // overflow: hidden; /* Hide overflowing characters */
    white-space: nowrap; /* Prevent text from wrapping */
    animation: ${slideLeftAnimation} 3s forwards; /* Duration and steps for animation */
    animation-delay: ${props => props.$animationDelay || "0s"};
    // border-right: 1px solid #55B4B0;

    /* Initially set the text to be invisible */
    visibility: hidden;
    // border-right: 2px solid #fff;
    /* Add a class to set visibility to visible after the animation-delay has passed */
    &.visible {
        visibility: visible;
        animation: none;
    }

    filter: drop-shadow(8px 5px green) sepia(60%) hue-rotate(90deg);
    
    &:hover {
      // background: rgba(255, 255, 255, 0.7); 
      animation: ${glitchAnimation} 2s ease-in-out forwards;
      animation-iteration-count: infinite;
      // filter: blur(4px); /* Adjust the blur amount as needed */
    }


    grid-row: 1;
    grid-column: 1;
    z-index: 3;
`


export const CardContainer = styled(Col)`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // Creates 2 columns
    gap: 1.5rem; // Reduced from 2rem
    padding: 1.5rem; // Reduced from 2rem
    width: 100%;
    height: auto;
    background: #000;
    overflow-y: auto; // Enables vertical scrolling
    
    /* Hide the default scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
  
    /* WebKit-based browsers */
    &::-webkit-scrollbar {
        width: 3px;
    }
  
    &::-webkit-scrollbar-thumb {
        height: 3px;
        background-color: #888;
        border-radius: 4px;
    }
  
    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
  
    &::-webkit-scrollbar-track {
        background-color: #000;
    }

    grid-row: 2;
    grid-column: 1;
    z-index: 1;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr; // Single column on smaller screens
    }
`

export const StyledCard = styled(Card)`
    width: 80%;
    max-width: 500px;
    min-width: 300px;
    border-radius: 40px;
    height: fit-content;
    min-height: 300px;
    margin: 0 auto;
    transition: all 0.5s ease-in-out;
    position: relative;
    z-index: 1;
    opacity: ${props => props.$isActive ? 1 : 0.3};
    filter: ${props => props.$isActive ? 'none' : 'blur(4px)'};
    transform: scale(${props => props.$isActive ? 1 : 0.8});
    display: flex;
    visibility: visible;

    @media screen and (max-width: 768px) {
      width: 100%;
      min-width: unset;
      margin: 0;
      opacity: 1;
      filter: none;
      transform: scale(1);
    }

    &:hover {      
      @media screen and (max-width: 768px) {
        filter: sepia(60%);
      }
    }
`

export const CardBody = styled(Card.Body)`
    align-items: left;
    border: 1px solid #fff;
    border-radius: 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const CardTitle = styled(Card.Title)`
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 420px; 
    min-width: 410px;
    height: auto;
    font-family: 'VT323', monospace;
    font-size: 30px; // Reduced from 40px
    padding: 8px; // Reduced from 10px
    margin-left: auto;
    margin-right: auto;
    background-color: #00246B;

    visibility: hidden;
    &.visible {
        visibility: visible;
    }
`

export const CardText = styled(Card.Text)`
    color: #fff;
    display: flex;
    background: ${props => props.$bgColor || "fff"};
    text-align: center;
    align-self: center;
    align-items: center;
    margin-left: ${props => props.$marginLeft || "0px"};
    margin-right: ${props => props.$marginRight || "0px"};
    margin-bottom: ${props => props.$marginBottom || "0px"};
    font-family: 'VT323', monospace;
    justify-content: ${props => props.$justifyContent || "left"};
    padding: ${props => props.$padding || "0px"};
    font-size: ${props => props.$fontSize || "16px"}; // Reduced from 20px
    font-weight: 400;
`

export const CardLink = styled(Link)`
    color: rgba(255, 255, 255);
    text-align: right;
    text-decoration: none;

    font-family: 'MajorMonoDisplay', monospace;
    font-size: 40px;
    font-weight: 500;


    top: 20%;
    width: 100%;
    cursor: pointer;
    &.active {
        color: #00c254;
    }

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #253ea1;
        color: #fff;
        font-size: 60px;
        font-weight: 5000;

    }
`;

export const CardMenu = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    
    @media screen and (max-width: 768px) {
        display: none;
    }


    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9;
    font-size: 24px;
    box-shadow: 0 10px 15px -3px rgb(46 41 51 / 8%), 0 4px 6px -2px rgb(71 63 79 / 16%);
    width: 100%;
    height: 100%;
    transition: transform ease-in-out 0.2s;
    /* transition: width ease 0.2s; */

    /* Show the menu items when the menu is open */
    .open & {
        display: flex;
    }

    li {
        margin-right: 20px;

        /* Add spacing between menu items for small screens */
        @media screen and (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 10px;
        }
    }
`;


export const StyledGithubIcon = styled(FaGithub)`
  height: auto;
  width: 20px;
  transition: transform 0.3s ease; /* Add a smooth transition effect on hover */
  
  &:hover {
    color: #000; /* Change the color to black on hover */
    transform: translateY(-3px); /* Raise the icon by 3 pixels on hover */
  }
`;

export const StyledDownloadIcon = styled(FaDownload)`
  height: auto;
  width: 20px;
  transition: transform 0.3s ease; /* Add a smooth transition effect on hover */
  
  &:hover {
    color: #000; /* Change the color to black on hover */
    transform: translateY(-3px); /* Raise the icon by 3 pixels on hover */
  }
`;


export const CardBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;  // Space between buttons
  margin-top: 15px;
  
  @media screen and (max-width: 768px) {
    justify-content: center;
    margin-left: 0;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const StyledLink = styled.a`
  color: #FBEAEB;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    color: #55B4B0;
    transform: translateY(-2px);
  }

  /* Optional: add background on hover */
  &:hover {
    background: rgba(85, 180, 176, 0.1);
  }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column; // Changed to column to stack content vertically
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 40px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding: 10px;
    width: 100%;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
  background: #000;
  position: relative;
  transition: transform 0.5s ease-in-out;

  @media screen and (max-width: 768px) {
    min-height: 350px;
    width: 100%;
  }
`;

export const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px; // Add space between cards and controls
  width: 100%;

  @media screen and (max-width: 768px) {
    position: relative;
    bottom: 0;
    padding: 10px;
    background: transparent;
  }
`;

export const CarouselButton = styled.button`
  background: none;
  border: none;
  color: #55B4B0;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  z-index: 100;
  transition: color 0.3s ease;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    padding: 5px;
  }

  &:hover {
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 40px;
  transition: transform 0.5s ease-in-out;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 10px;
    gap: 0;
    
    /* Hide non-active cards on mobile */
    & > * {
      display: none;
      width: 100%;
    }
    
    /* Only show active card */
    & > *[data-active="true"] {
      display: flex;
    }
  }
`;

export const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: ${props => props.$flexWrap || "wrap"};
  margin-left: ${props => props.$marginLeft || "0px"};
  align-items: center;
`;

export const LanguageTitle = styled.h1`
  align-self: center;
  text-align: center;
  margin-left: ${props => props.$marginLeft || "0px"};
  font-size: 20px;
  color: #B8A7E9; // Pale purple text
  margin-right: 10px;
`;

export const LanguageIndv = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000; // Pale purple border
  border-radius: 15px;
  margin: 4px;
  padding: 6px 12px;
  color: #B8A7E9; // Pale purple text
  text-decoration: none;
  font-size: 14px;
  background: rgba(184, 167, 233, 0.1); // Very light purple background
  transition: all 0.3s ease;
  min-width: 80px;
  
  &:hover {
    background: #B8A7E9;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(184, 167, 233, 0.3);
  }
`;

export const LanguagePercentage = styled.div`
  color: #B8A7E9; // Pale purple text
  font-size: 14px;
  margin-left: 6px;
  font-weight: bold;
  
  ${LanguageIndv}:hover & {
    color: #000;
  }
`;
