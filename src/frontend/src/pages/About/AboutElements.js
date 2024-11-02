import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../assets/background.jpg'

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

const slideDownAnimation = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
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
export const AboutParentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
    height: 100vh;
`;

export const AboutContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: left;
    text-align: left;
    background: rgba(0,0,0,0.3);
    width: 100%;
    color: #fff;
    align-items: left;
    height: 100vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 80px;
    padding: 20px;
    // border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    // border-radius: 25px;

    grid-row: 1;
    grid-column: 1;
    z-index: 2;

    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: hidden;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-left: 0px;
        border-top: none;
        border-left: none;
        padding: 0px;
    } 
`;

export const AboutBgImg = styled.img`
    margin-top: 190px;
    margin-right: auto;
    margin-left: 100px;
    // padding: 20px;
    height: 390px;
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
    visibility: hidden;

    /* Animation state */
    &.visible {
        visibility: visible;
        animation: ${slideLeftAnimation} 2s ease-in-out forwards;
    }

    /* Prevent re-triggering */
    &.visible {
        transform: translateX(0) rotateY(20deg) rotateZ(10deg);
        opacity: 1;
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        // display: none;
        height: auto;
        width: 300px;
    } 
`;



export const AboutLeftContainer = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: left;
    text-align: left;
    background: rgba(0,0,0,0.5);
    width: 100%;
    color: #fff;
    align-items: left;
    min-height: 100vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 5px;
    padding: 20px;

    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: hidden;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        border: 1px solid #ccc;
        margin-right: 10px;
        padding: 10px;
    }
`;

export const AboutRightContainer = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: left;
    text-align: left;

    background-image: url(${backgroundImage});
    background-size: cover; /* Adjust the background size to cover the container */
    background-position: center; /* Center the background image */


    width: 100%;
    color: #fff;
    align-items: left;
    min-height: 20vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 20px;
    // padding: 20px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: hidden;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        display: none;
    } 
`;

export const RightContainerImg = styled.img`
    height: 400px;
    width: auto;
    align-self: center;
    background: none;
    margin-left: 40px;
    @media screen and (max-width: 768px) {
        display: none;
    }
    &:hover {
        animation: ${slideUpAnimation} 2s ease-in-out forwards;
    }

    /* Set the initial position to below the viewport */
    transform: translateY(100%);
    opacity: 0;

    /* Apply the slide-up animation */
    animation: ${slideDownAnimation} 3s ease-in-out forwards;

    /* Hide the scrollbar during the animation */
    overflow: hidden;
`;

export const AboutContainerTitle = styled.div`

    align-items: left;

    text-align: left;
    color: ${props => props.$inputColor || "#55B4B0;"};
    font-family: 'IBMPlexMonoBold', monospace;
    // padding-left: 20px;
    font-size: ${props => props.$size || "40px"};
    font-weight: 500;

    /* Typing cursor animation */
    overflow: hidden; /* Hide overflowing characters */
    white-space: nowrap; /* Prevent text from wrapping */

    // border-right: 1px solid #55B4B0;

    /* Initially set the text to be invisible */
    visibility: hidden;
    // border-right: 2px solid #fff;
    /* Add a class to set visibility to visible after the animation-delay has passed */
    &.visible {
        visibility: visible;
        animation: ${slideRightAnimation} 1s; /* Duration and steps for animation */
        animation-delay: ${props => props.$animationDelay || "0s"};
    }

    filter: drop-shadow(8px 5px green) sepia(60%) hue-rotate(90deg);

    &:hover {
      // background: rgba(255, 255, 255, 0.7); 
      // animation: ${glitchAnimation} 2s ease-in-out forwards;
      // animation-iteration-count: infinite;
      filter: drop-shadow(8px 5px blue) sepia(60%); /* Adjust the blur amount as needed */
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        text-align: left;
        align-self: left;
        margin-right: 10px;
        padding: 10px;
    }
`;

export const AboutDescriptionText = styled.div`
    color: ${props => props.$inputColor || "#5f7c96"};
    font-family: 'KolkerBrush',  monospace, 'Helvetica Neue', Arial, sans-serif; // Updated font-family;
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
    align-self: left;
    display: flex;
    justify-content: space-between;
    align-items: ${props => props.$alignItems || "left"};
    
    /* Add these properties to constrain text within viewport */
    max-width: 90%;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    
    /* Ensure container doesn't overflow */
    overflow: hidden;
    text-overflow: ellipsis;
    
    /* Add responsive padding */
    // padding-right: 20px;
    
    @media screen and (max-width: 768px) {
        font-size: 16px;
        padding-right: 10px;
        margin-right: 10px;
    }
`;

export const AboutContainerText = styled.div`
    color: ${props => props.$inputColor || "#fff"};
    font-family: 'IBMPlexMonoBold', monospace;
    padding-left: 10px;
    font-size: ${props => props.$size || "40px"};
    font-weight: 500;
`
export const AboutDescriptionContainer = styled.div`
    display: flex;
    justify-content: start;
    color: ${props => props.$inputColor || "#fff"};
    padding: ${props => props.$padding || "5px"};
    margin: ${props => props.$margin || "5px"};
    align-items: ${props => props.$alignItems || "left"};
    flex-direction: ${props => props.$flexDirection || "column"};
    background: ${props => props.$background || "none"};
    border: ${props => props.$border || "none"};
    border-radius: ${props => props.$borderRadius|| "10px"};

    font-family: 'VT323', monospace;
    // font-size: 10px;

    /* Initial state */
    transform: translateY(100%);
    opacity: 0;
    visibility: hidden;

    /* Animation state */
    &.visible {
      visibility: visible;
      animation: ${slideRightAnimation} 1s ease-in-out forwards;
      animation-delay: ${props => props.$animationDelay || "0s"};
    }

    /* Prevent re-triggering */
    &.visible {
      transform: translateY(0);
      opacity: 1;
    }

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-right: 10px;
        padding: 10px;
        overflow: hidden;
    }
`;

export const ToolsContainer = styled.div`
    display: flex;
    justify-content: center;
    color: ${props => props.$inputColor || "#fff"};
    padding: ${props => props.$padding || "5px"};
    
    align-items: ${props => props.$alignItems || "center"};
    flex-direction: ${props => props.$flexDirection || "column"};
    background: ${props => props.$background || "none"};
    border: ${props => props.$border || "1px solid #fff"};
    border-radius: ${props => props.$borderRadius|| "10px"};
    
    width: 40%;
    margin-left: ${props => props.$marginLeft || "auto"};
    margin-right: ${props => props.$marginRight || "auto"};
    margin-top: 100px;
    
    font-family: 'VT323', monospace;
    font-size: 30px;

    /* Initial state */
    transform: translateY(100%);
    opacity: 0;
    visibility: hidden;

    /* Animation state */
    &.visible {
      visibility: visible;
      animation: ${slideUpAnimation} 1s ease-in-out forwards;
    }

    /* Prevent re-triggering */
    &.visible {
      transform: translateY(0);
      opacity: 1;
    }

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        width: 90%; // Increased width for mobile
        margin: 10px auto; // Center horizontally
        padding: 5px;
        overflow: auto;
    }
`;

export const ToolsTitle = styled.div`
    color: ${props => props.$inputColor || "#55B4B0"};
    font-family: 'VT323', monospace;
    text-align: center;
    align-items: center;
    padding: 20px;
    font-size: ${props => props.$size || "100px"};
    font-weight: 50;
    
    /* Typing cursor animation */
    overflow: hidden; /* Hide overflowing characters */
    white-space: nowrap; /* Prevent text from wrapping */
    animation: ${props => typingAnimationWithSteps(props.children)} 2s forwards; /* Duration and steps for animation */
    animation-delay: ${props => props.$animationDelay || "0s"};
    
    /* Initially set the text to be invisible */
    visibility: hidden;
    // border-right: 2px solid #fff;
    /* Add a class to set visibility to visible after the animation-delay has passed */
    &.visible {
        visibility: visible;    
    }
    
    // @media screen and (max-width: 768px) {
    //     justify-content: center;
    //     align-self: center;
    //     text-align: center;
    // }

`;

export const ToolDescriptionText = styled.div`
    color: ${props => props.$inputColor || "#5f7c96"};
    font-family: 'KolkerBrush', monospace;
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
    align-self: right;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    // max-width: 800px; /* Optional: Set a maximum width to limit the number of items per row */
    align-items: ${props => props.$alignItems || "left"};
    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        justify-content: center;
        font-size: 30px;
        align-items: center;
        margin-right: 0px;
        padding: 10px;
        overflow: auto;
        flex-wrap: wrap;
    }
`;

// ${props => props.$flexBasis|| "0px"};  Calculate the width of each item (25% - 20px for spacing) 
export const ToolsDescriptionContainer = styled.div`
    display: flex;
    justify-content: center;
    color: ${props => props.$inputColor || "#fff"};
    padding: ${props => props.$padding || "10px"};
    width: 40%;
    margin: ${props => props.$margin || "5px"};
    align-items: ${props => props.$alignItems || "center"};
    flex-direction: ${props => props.$flexDirection || "column"};
    background: ${props => props.$background || "none"};
    border: ${props => props.$border || "none"};
    border-radius: ${props => props.$borderRadius|| "10px"};
    flex-basis: calc(25% - 20px); /* Calculate the width of each item (25% - 20px for spacing) */
    font-family: 'VT323', monospace;
    font-size: 20px;

    /* Set the initial position to below the viewport */
    transform: translateY(100%);
    opacity: 0;

    /* Apply the slide-up animation */
    animation: ${slideUpAnimation} 2s ease-in-out forwards;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    &:hover {
      background: #fff;
      color: #000;
      transform: translateY(1);
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        width: 250px;
        font-size: 15px;
        overflow: hidden;
        flex-wrap: wrap;
        align-items: center;
        text-align: center;
    }
`;


