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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  background: rgba(0,0,0,0.5);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
    align-items: left;
    height: 90vh;
    margin-left: 80px;
    padding: 20px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-radius: 25px 0 0 0;
    position: relative;
    z-index: 2;
    overflow-x: hidden;

    @media screen and (max-width: 768px) {
        margin-left: 0px;
        border-top: none;
        border-left: none;
        padding: 0px;
    } 
`;

export const HomeBgImg = styled.img`
  position: absolute;
  top: 15%;
  right: 5%;
  transform: translateY(-50%) translateX(100%);
  height: 50vh;
  width: auto;
  z-index: 1;
  object-fit: cover;
  filter: blur(0.5px);
  
  /* Initial state */
  opacity: 0;
  visibility: hidden;

  /* Animation state */
  &.visible {
    visibility: visible;
    opacity: 0.08;
    animation: ${slideLeftAnimation} 1s ease-in-out forwards;
  }
  
  @media screen and (max-width: 768px) {
    top: 13%;
    right: 7%;
    height: 25vh;
    width: 100%;
    object-fit: cover;
    opacity: 0.05;
  } 
`;

export const HomeContainerTitle = styled.div`
  color: #55B4B0;
  font-family: 'IBMPlexMonoBold', monospace;
  padding: 20px;
  font-size: 18px;
  font-weight: 50;
  opacity: 0;
  visibility: visible;

  opacity: 1;
  animation: ${slideRightAnimationTitle} 1s forwards;
  animation-delay: ${props => props.$animationDelay || "0s"};

  /* Account for mobile devices */
  @media screen and (max-width: 768px) {
      font-size: 18px;
  }

  @media screen and (max-width: 472px) {
    font-size: 15px; // Larger font for name
    width: 80%; // Wider on mobile
    padding: 5px 10px; // Add some padding
  }
`;

export const HomeContainerText = styled.div`
    color: ${props => props.$inputColor || "#fff"};
    font-family: 'IBMPlexMonoBold', monospace;
    padding-left: 20px;
    font-size: ${props => props.$size || "30px"};
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

    @media screen and (max-width: 768px) {
        font-size: 50px; // Larger font for name
        width: 80%; // Wider on mobile
        padding: 5px 10px; // Add some padding
    }

    @media screen and (max-width: 472px) {
        font-size: 40px; // Larger font for name
        width: 80%; // Wider on mobile
        padding: 5px 10px; // Add some padding
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

      @media screen and (max-width: 768px) {
        font-size: 20px; // Smaller font for role
        margin-top: 10px; // Add some spacing
      }

      @media screen and (max-width: 472px) {
        font-size: 15px; // Larger font for name
        width: 80%; // Wider on mobile
        padding: 5px 10px; // Add some padding
      }
      
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