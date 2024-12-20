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

// Add a smooth typing animation for the name
const smoothTypingAnimation = keyframes`
  from {
    width: 0;
    opacity: 0.5;
  }
  to {
    width: 7ch;
    opacity: 1;
  }
`;

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


const slideRightAnimationTitle = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
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
    padding: 20px;
    overflow: auto;
    height: 100vh;
    background: rgba(10,10,10,0.8);
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`;

export const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  background: rgba(0,0,0,0.5);
  overflow-x: hidden;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const HomeContainer = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: left;
    text-align: left;
    background: transparent;
    width: 100%;
    color: #fff;
    min-height: 90vh;
    height: auto;
    margin-left: 80px;
    padding: 20px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 25px 0 0 0;
    position: relative;
    z-index: 2;
    overflow-x: hidden;

    @media screen and (max-width: 768px) {
        margin-left: 20px;
        margin-right: 20px;
        border-top: none;
        border-left: none;
        padding: 20px;
        margin-bottom: 0px;
    } 
`;

export const HomeBgImg = styled.img`
  position: absolute;
  top: 15%;
  right: 5%;
  height: 50vh;
  width: auto;
  z-index: 1;
  object-fit: cover;
  filter: blur(0.5px);
  
  /* Reset state */
  &:not(.visible) {
    visibility: hidden;
    opacity: 0;
    transform: translateX(100%);
  }

  /* Animation state */
  &.visible {
    visibility: visible;
    opacity: 0.08;
    animation: ${slideLeftAnimation} 1s ease-in-out forwards;
  }
  
  @media screen and (max-width: 768px) {
    top: 0%;          // Moved higher up
    right: -20%;      // Moved more to the right
    height: auto;     // Slightly smaller height
    width: 100%;      // Let width adjust based on height
    opacity: 0.05;
    transform-origin: top right; // Set transform origin for better positioning
  } 
`;

export const HomeContainerTitle = styled.div`
  color: #55B4B0;
  font-family: 'IBMPlexMonoBold', monospace;
  padding: 20px;
  font-size: 18px;
  font-weight: 50;
  margin-top: clamp(80px, 15vh, 150px);
  
  /* Reset state */
  &:not(.visible) {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
  }

  /* Animation state */
  &.visible {
    visibility: visible;
    opacity: 1;
    animation: ${slideRightAnimationTitle} 1s forwards;
    animation-delay: ${props => props.$animationDelay || "0s"};
  }


  @media screen and (max-width: 472px) {
    font-size: 15px;
    width: 100%;
    padding: 5px 10px;
    margin-top: 50px;
  }
`;

export const HomeContainerText = styled.div`
    color: ${props => props.$inputColor || "#fff"};
    font-family: 'IBMPlexMonoBold', monospace;
    padding-left: 20px;
    font-size: ${props => props.$size || "30px"};
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    visibility: hidden;
    
    /* Base styles for name variant */
    &.name {
        background: rgba(255, 255, 255, 0.7); 
        border-radius: 10px;
        width: 0;
        opacity: 0;
        // padding: 0 20px;
        
        &.typing {
            visibility: visible;
            animation: ${smoothTypingAnimation} 2s ease-in-out forwards;
            animation-delay: ${props => props.$animationDelay || "0s"};
        }
    }

    /* Role styling */
    &.role {
        width: 0;
        margin-top: 20px;
        opacity: 0;
        padding-left: 20px;
        
        &.typing {
            visibility: visible;
            opacity: 1;
            animation: ${props => typingAnimationWithSteps(props.children)} 3s steps(${props => 
                props.children ? props.children.toString().length : 0}, end) forwards;
            animation-delay: ${props => props.$animationDelay || "0s"};
        }

        &:hover {
            animation: ${glitchAnimation} 2s ease-in-out forwards;
            animation-iteration-count: infinite;
        }
    }

    @media screen and (max-width: 768px) {
        visibility: hidden;
        opacity: 0;
        font-size: 32px;
        width: 100%;
        padding: 0;
        
        &.name {
            // padding: 0 10px;
            padding-left: 10px;
        }
        
        &.role {
            margin-bottom: 15px;
            margin-top: 0px;
            margin-right: 10px;
            font-size: clamp(16px, 2.5vw, 20px);
            padding-left: 10px;
        }
    }

    @media screen and (max-width: 375px) {
        visibility: hidden;
        opacity: 0;
        font-size: 30px;
        width: 100%;
        padding: 0;
        
        &.name {
            // padding: 0 8px;
            padding-left: 8px;
        }
        
        &.role {
            margin-bottom: 12px;
            margin-top: 0px;
            margin-right: 10px;
            font-size: clamp(14px, 2.5vw, 20px);
            padding-left: 8px;
        }
    }
`;

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
    overflow: hidden;

    /* Reset state */
    &:not(.visible) {
        transform: translateY(100%);
        opacity: 0;
        visibility: hidden;
    }

    /* Animation state */
    &.visible {
        visibility: visible;
        animation: ${slideUpAnimation} 1s ease-in-out forwards;
    }

    &:hover {
        filter: drop-shadow(8px 5px green) sepia(60%) hue-rotate(90deg);
    }

    @media screen and (max-width: 768px) {
        margin-top: 20px;
        font-size: 18px;
        padding: 5px 8px;
        margin-right: 10px;
        text-align: left;
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