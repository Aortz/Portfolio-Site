import styled, { keyframes } from "styled-components";
import treasureMap from "../../assets/treasure-map.png"
import PlaceIcon from '@mui/icons-material/Place';


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
    margin-left: 80px;
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

export const ResumeContainerTitle = styled.div`
    align-items: left;

    text-align: left;
    font-family: 'IBMPlexMonoBold', monospace;
    // padding: 20px;
    font-weight: 500;
    color: ${props => props.$inputColor || "#55B4B0"};
    font-size: ${props => props.$size || "40px"};

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

    &:hover {
        // background: rgba(255, 255, 255, 0.7); 
        animation: ${glitchAnimation} 2s ease-in-out forwards;
        animation-iteration-count: infinite;
        // filter: blur(4px); /* Adjust the blur amount as needed */
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        text-align: left;
        align-self: left;
        margin-right: 10px;
        padding: 10px;
    }
`;

export const ResumeBgImg = styled.img`
    margin-top: 160px;
    margin-left: auto;
    margin-right: 20px;
    // padding: 20px;
    height: 350px;
    width: auto;
    align-self: right;
    background: none;

    /* Your content styles go here */
    grid-row: 1;
    grid-column: 1;
    z-index: 1;

    /* Set the initial position to below the viewport */
    transform: translateX(100%);
    opacity: 0;

    /* Apply the slide-up animation */
    animation: ${slideLeftAnimation} 2s ease-in-out forwards;
    
    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        // display: none;
        height: auto;
        width: 300px;
    } 
`;

export const ResumeDropdownContainer = styled.div`
    display: flex;
    flex-direction: column;

    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9;
    font-size: 24px;
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

// export const ResumeDropdownItem = styled.div`

export const TreasureMapRoute = styled.div`
  background: none;;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
  margin-top: 70px;
  margin-left: 120px;
  width: 80%;
  height: 100%;
  position: relative;
  border: 5px solid #000;
  background-image: url(${treasureMap});
  
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Optional: Add a shadow for a more realistic effect */
`;

export const PitStop = styled.div`
//   background-color: grey;
//   border-left: 1px solid white;
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
`;

export const DottedLine = styled.div`
  position: absolute;
  border-top: 1px dotted #000;
  width: ${props => props.$width}px;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
`;

export const expandAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 150px;
  }
`;

export const ExpandedPitStop = styled.div`
  background-color: grey;
  width: 150px;
  height: 100px;
  position: absolute;
  border-radius: 10px;
  cursor: pointer;
`;
