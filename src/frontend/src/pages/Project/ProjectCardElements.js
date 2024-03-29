import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
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

export const ProjectContainer = styled.div`
    // display: flex;
    // justify-content: start;
    // flex-direction: column;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: left;
    text-align: left;
    background: #000;
    width: 100%;
    color: #fff;
    align-items: left;
    min-height: 100vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 60px;
    padding: 20px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 25px;
    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: auto;

    overflow:hidden;
`;

export const ContainerTitle = styled.div`
    color: #55B4B0;
    align-items: left;
    
    text-align: left;
    font-family: 'IBMPlexMonoBold', monospace;
    padding: 20px;
    font-size: 40px;
    font-weight: 500;

    /* Typing cursor animation */
    overflow: hidden; /* Hide overflowing characters */
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
        
    }

    filter: drop-shadow(8px 5px green) sepia(60%) hue-rotate(90deg);
    // filter: drop-shadow(10px 10px green) sepia(60%) hue-rotate(90deg);

    grid-row: 1;
    grid-column: 1;
    z-index: 3;
`


export const CardContainer = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: auto;
    background: #000;
    width: 100%;
    // margin: 10px;

    flex-wrap: wrap;
    border: 1px solid #fff,
    border-radius: 90px;
    padding: 10px;

    animation: ${slideUpAnimation} 3s forwards; /* Duration and steps for animation */
    

    /* Set a fixed height for the container so that it doesn't grow infinitely */
    // height: 800px;
    /* Allow vertical scrolling when content overflows */
    overflow-y: hidden;
    /* Customize the scrollbar track */
    scrollbar-width: thin;
    scrollbar-color: #fff; /* thumb color and track color */


    grid-row: 2;
    grid-column: 1;
    z-index: 1;
`

export const StyledCard = styled(Card)`

    // justify-content: center;
    // align-items: center;
    border-radius: 40px;
    margin: 10px;
    // width: 50%;
    // height: 50%;

    &:hover {
        // filter: blur(4px); /* Adjust the blur amount as needed */ 
        filter: opacity(50%) drop-shadow(0px 0px red) sepia(10%) saturate(30%);
        // filter: brightness(0.4);
        // filter: contrast(200%);
        // filter: drop-shadow(16px 16px 20px blue);
        // filter: grayscale(50%);
        // filter: hue-rotate(90deg);
        // filter: invert(75%);
        // filter: opacity(25%);
        // filter: saturate(30%);
        // filter: sepia(60%);
    }
    
    width: 40%;
    height: 50%;
    animation: ${slideUpAnimation} 3s forwards; /* Duration and steps for animation */
`

export const CardTitle = styled(Card.Title)`
    color: #fff;
    // align-self: center;
    text-align: center;
    font-family: 'VT323', monospace;
    font-size: 35px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;

    /* Typing cursor animation */
    overflow: hidden; /* Hide overflowing characters */
    white-space: nowrap; /* Prevent text from wrapping */
    // animation: ${props => typingAnimationWithSteps(props.children)} 2s forwards; /* Duration and steps for animation */
    // animation-delay: ${props => props.$animationDelay || "0s"};

    /* Initially set the text to be invisible */
    visibility: hidden;
    // border-right: 1px solid #fff;
    /* Add a class to set visibility to visible after the animation-delay has passed */
    &.visible {
        visibility: visible;
    }
    
`

export const CardBody = styled(Card.Body)`
    // background: rgba(255, 255, 255, 0.7);
    align-items: left;
    border: 1px solid #fff;
    border-radius: 5px;
`

export const CardText = styled(Card.Text)`
    color: #fff;
    display: flex;
    background: ${props => props.$bgColor || "fff"};
    align-self: center;
    align-items: center;
    margin-left: ${props => props.$marginLeft || "0px"};
    margin-right: ${props => props.$marginRight || "0px"};
    margin-bottom: ${props => props.$marginBottom || "0px"};
    font-family: 'VT323', monospace;
    justify-content: ${props => props.$justifyContent || "left"};
    padding: ${props => props.$padding || "0px"};

    // border: 1px solid #fff;
    // border-left: 1px solid #fff;

    font-size: 20px;
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
        background: #626385;
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


// export const CardBtn = styled(Button)`
//     width: 60px;
//     height: 60px;
//     cursor: pointer;
//     background: none;
//     border: none;
//     padding: 8px;
//     margin-right: 10px;
//     color: #000;
//     display: none;
//     @media screen and (max-width: 768px) {
//         display: none;
//     }
    
// `;

export const CardBtn = styled.a`
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid white;
  padding: 8px;
  margin-left: 20px;
  margin-bottom: 10px;

  &:hover {
    align-self: flex-start;
    background: #55B4B0;
    border: 1px solid #ccc;
    border-radius: 20px;
    color: #000;

    background: #000;
  }
`

export const CardButtonLink = styled.a`
  justify-content: space-between;
  background: #fffff;
  color: #fff;
  border: 1px solid black;
  borderRadius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  fontWeight: bold;
  fontSize: 14px;
  transition: background-color 0.3s;

  &:hover: {
    background: #000;
  }
`
