import styled, { keyframes } from 'styled-components';

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

const cursorBlinkAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

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

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(-10deg) rotateZ(-10deg);
    opacity: 1;
  }
`;
  

export const RouteContainer = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding: 20px; /* Add padding to match the Container behavior */
    overflow: auto;
    height: 100vh;
    background: rgba(10,10,10,0.8);

    
    /* Hide the default scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
  
    /* WebKit-based browsers */
    &::-webkit-scrollbar {
      width: 10px;
      
    }
  
    &::-webkit-scrollbar-thumb {
      // background-image: url('../../assets/scrollbar/mario-climbing-thumb.png');
      // background-repeat: no-repeat;
      // background-size: cover;
      height: 5px;
      background-color: #888;
      border-radius: 4px;
    }
  
    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
      // background-image: url('../../assets/scrollbar/mario-climbing-thumb.png');
      // background-repeat: no-repeat;
      // background-size: cover;
    }
  
    &::-webkit-scrollbar-track {
      background-color: #000;
      // background-image: url('../../assets/scrollbar/vine-track.png');
    }
`;

export const ParentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 50vh;
`;

export const HomeContainer = styled.div`
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
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 25px 0 0 0;

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

export const HomeBgImg = styled.img`
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

export const HomeContainerTitle = styled.div`
    color: #55B4B0;

    font-family: 'IBMPlexMonoBold', monospace;
    padding: 20px;
    font-size: 18px;
    font-weight: 50;
`

export const HomeContainerText = styled.div`
    color: ${props => props.$inputColor || "#fff"};
    font-family: 'IBMPlexMonoBold', monospace;
    padding-left: 20px;
    font-size: ${props => props.$size || "40px"};
    font-weight: 500;
    overflow: hidden; /* Hide overflowing characters */
    white-space: nowrap; /* Prevent text from wrapping */
    animation: ${props => typingAnimationWithSteps(props.children)} 3s forwards; /* Duration and steps for animation */
    animation-delay: ${props => props.$animationDelay || "0s"};
    
    /* Initially set the text to be invisible */
    visibility: hidden;
    // border-right: 2px solid #fff;
    /* Add a class to set visibility to visible after the animation-delay has passed */
    &.visible {
        visibility: visible;     
    }

    
    &.name {
        background: rgba(255, 255, 255, 0.7); 
        border-radius: 10px;
        width: 48%
    }

    &.role {
      &:hover {
      // background: rgba(255, 255, 255, 0.7); 
      animation: ${glitchAnimation} 2s ease-in-out forwards;
      animation-iteration-count: infinite;
      // filter: blur(4px); /* Adjust the blur amount as needed */
      }
      
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        font-size: 30px;
    } 
`

export const Cursor = styled.span`
    /* Cursor styling */
    border-right: 2px solid ${props => props.$inputColor || "#fff"};
    /* Apply only the cursor blinking animation */
    animation: ${cursorBlinkAnimation} 1s infinite;
`;


export const HomeContainerDescription = styled.div`
    color: ${props => props.$inputColor || "#5f7c96"};
    font-family: 'KolkerBrush', monospace;
    padding: 20px;
    margin-top: 50px;
    font-size: 18px;
    font-weight: 500;

  /* Set the initial position to below the viewport */
    transform: translateY(100%);
    opacity: 0;

    /* Apply the slide-up animation */
    animation: ${slideUpAnimation} 1s ease-in-out forwards;

    /* Hide the scrollbar during the animation */
    overflow: hidden;

    &:hover {
      // animation: ${glitchAnimation} 2s ease-in-out forwards;
      // animation-iteration-count: infinite;
      filter: drop-shadow(8px 5px green) sepia(60%) hue-rotate(90deg);
      
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-top: 20px;
        font-size: 18px;
    } 
`;

export const MobileHomeImg = styled.img`

    display: none;

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        display: inline;
        margin-top: 30px;
        height: auto;
        width: 200px;
        align-self: center;

        /* Set the initial position to below the viewport */
        transform: translateY(100%);
        opacity: 0;

        /* Apply the slide-up animation */
        animation: ${slideUpAnimation} 3s ease-in-out forwards;

        /* Hide the scrollbar during the animation */
        overflow: hidden;
    } 
`;