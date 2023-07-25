import styled, { keyframes } from 'styled-components';
import backgroundImage from '../../assets/background.jpg'
import animeBgImg from '../../assets/anime-background.jpg'

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

// Define the flip animation using keyframes
const flipAnimation = keyframes`
  from {
    transform: perspective(800px) rotateY(0);
  }
  to {
    transform: perspective(800px) rotateY(180deg);
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

export const AboutContainer = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: row;
    align-items: left;
    text-align: left;
    background: #000;
    width: 100%;
    color: #fff;
    align-items: left;
    min-height: 20vh; /* Use min-height instead of height to prevent overflow */
    margin-left: 60px;
    padding: 20px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 25px;
    /* Add the following styles to remove the horizontal scrollbar */
    overflow-x: hidden;

    /* Hide the scrollbar during the animation */
    overflow: auto;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-left: 0px;
        border-top: none;
        border-left: none;
        padding: 0px;
    } 
`;

export const AboutLeftContainer = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: left;
    text-align: left;
    background: #000;
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

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        text-align: left;
        align-self: left;
        margin-right: 10px;
        padding: 10px;
    }
`;

export const AboutContainerText = styled.div`
    color: ${props => props.$inputColor || "#fff"};
    font-family: 'IBMPlexMonoBold', monospace;
    padding-left: 20px;
    font-size: ${props => props.$size || "40px"};
    font-weight: 500;
`
export const AboutDescriptionContainer = styled.div`
    display: flex;
    justify-content: start;
    color: ${props => props.$inputColor || "#fff"};
    padding: ${props => props.$padding || "10px"};
    margin: ${props => props.$margin || "5px"};
    align-items: ${props => props.$alignItems || "left"};
    flex-direction: ${props => props.$flexDirection || "column"};
    background: ${props => props.$background || "none"};
    border: ${props => props.$border || "none"};
    border-radius: ${props => props.$borderRadius|| "10px"};

    font-family: 'VT323', monospace;
    // font-size: 10px;

    /* Set the initial position to below the viewport */
    transform: translateY(100%);
    opacity: 0;

    /* Apply the slide-up animation */
    animation: ${slideUpAnimation} 2s ease-in-out forwards;

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
    justify-content: start;
    color: ${props => props.$inputColor || "#fff"};
    padding: ${props => props.$padding || "10px"};
    margin: ${props => props.$margin || "5px"};
    align-items: ${props => props.$alignItems || "center"};
    flex-direction: ${props => props.$flexDirection || "column"};
    background: ${props => props.$background || "none"};
    border: ${props => props.$border || "none"};
    border-radius: ${props => props.$borderRadius || "10px"};

    font-family: 'VT323', monospace;

    /* Set the initial position to below the viewport */
    opacity: 0;
    transform: translateY(100%);

    /* Apply the slide-up animation */
    animation: ${slideUpAnimation} 2s ease-in-out forwards;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-right: 10px;
        padding: 10px;
        overflow: auto;
    }

//   /* Back face styles */
//   .back-face {
//     /* Display the back face of the component */
//     transform: perspective(800px) rotateY(180deg);
//   }

//   /* Initially hide the back face */
//   .back-face,
//   .front-face {
//     backface-visibility: hidden;
//   }

//   /* Apply the flip effect on hover */
//   &:hover {
//     .front-face {
//       transition: transform 1s ease-in-out;
//       transform: perspective(800px) rotateY(180deg);
//     }

//     .back-face {
//       /* Show the back face on hover */
//       transition: transform 1s ease-in-out;
//       transform: perspective(800px) rotateY(0);
//     }
//   }
`;

export const ToolsTitle = styled.div`
    color: ${props => props.$inputColor || "#55B4B0"};
    font-family: 'IBMPlexMonoBold', monospace;
    text-align: center;
    align-items: center;
    padding: 20px;
    font-size: ${props => props.$size || "40px"};
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

`;

export const ToolDescriptionText = styled.div`
    color: ${props => props.$inputColor || "#5f7c96"};
    font-family: 'KolkerBrush', monospace;
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
    align-self: right;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: ${props => props.$alignItems || "left"};
    // border: 1px solid #ccc;
    // border-radius: 25px;
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

export const AboutDescriptionText = styled.div`
    color: ${props => props.$inputColor || "#5f7c96"};
    font-family: 'KolkerBrush', monospace;
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
    align-self: right;
    display: flex;
    justify-content: space-between;
    align-items: ${props => props.$alignItems || "left"};
    // border: 1px solid #ccc;
    // border-radius: 25px;
    /* Hide the scrollbar during the animation */
    overflow: hidden;
`;

export const ToolsDescriptionContainer = styled.div`
    display: flex;
    justify-content: start;
    color: ${props => props.$inputColor || "#fff"};
    padding: ${props => props.$padding || "10px"};
    margin: ${props => props.$margin || "5px"};
    align-items: ${props => props.$alignItems || "left"};
    flex-direction: ${props => props.$flexDirection || "column"};
    background: ${props => props.$background || "none"};
    border: ${props => props.$border || "none"};
    border-radius: ${props => props.$borderRadius|| "10px"};

    font-family: 'VT323', monospace;
    // font-size: 10px;

    /* Set the initial position to below the viewport */
    transform: translateY(100%);
    opacity: 0;

    /* Apply the slide-up animation */
    animation: ${slideUpAnimation} 2s ease-in-out forwards;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        width: 240px;
        font-size: 20px;
        overflow: hidden;
        align-items: center;
        text-align: center;
    }
`;


