import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { BiMenuAltRight } from 'react-icons/bi';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

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
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;


export const Nav = styled.nav`
    background-color: rgba(0, 0, 0, 0.8);
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999; /* Ensure the navbar is on top */

    @media screen and (max-width: 768px) {
        justify-content: center;
        height: 65px;
    }
`;

export const VerticalNav = styled.nav`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    bottom: 0; /* Stick to the bottom of the screen */
    left: 0; /* Stick to the left of the screen */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align items to the start (left) of the flex container */
    z-index: 999;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;

    /* Set the initial position to below the viewport */
    opacity: 0;
    transform: translateY(100%);
  
    /* Apply the slide-up animation */
    animation: ${slideUpAnimation} 2s ease-in-out forwards;
  
    /* Hide the scrollbar during the animation */
    overflow: hidden;

    @media screen and (max-width: 768px) {
        display: none;
    }
    
`;

export const VerticalNavLogo = styled.a`
    padding: 5px;
    align-self: center;
    @media screen and (max-width: 768px) {
        display: none;
    } 
`;

export const VerticalNavText = styled.div`
    
    height: 40px;
    font-family: 'MajorMonoDisplay', monospace;
    font-size: 50px;
    font-weight: 5;
    color: #98B4D4;
    margin-bottom: 20px;
    align-items: center;

`;

export const StyledGHLogo = styled(FaGithub)`
    width: 30px;
    height: 30px;
    // background: #98B4D4;
    color: #98B4D4;
    align-self: center;
    @media screen and (max-width: 768px) {
        display: none;
    } 
    
    &:hover {
        color: #fff;
    }
`;

export const StyledInstaLogo = styled(FaInstagram)`
    width: 30px;
    height: 30px;
    // background: #98B4D4;
    color: #98B4D4;
    align-self: center;
    
    &:hover {
        color: #fff;
    }
`;

export const StyledLinkedinLogo = styled(FaLinkedin)`
    width: 30px;
    height: 30px;
    align-self: center;
    color: #98B4D4;

    &:hover {
        color: #fff;
    }
`;

export const NavLink = styled(Link)`
    color: rgba(255, 255, 255);
    text-align: right;
    text-decoration: none;

    font-family: 'MajorMonoDisplay', monospace;
    font-size: 35px;
    font-weight: 500;

    animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;

    top: 20%;
    width: 100%;
    cursor: pointer;
    &.active {
        color: #C3447A;
    }

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #98B4D4;
        color: #fff;
        font-size: 50px;
        font-weight: 5000;

    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        font-family: 'MoiraiOne', monospace;
    }
`;

export const NavText = styled.div`
    // color: #737378;
    color: #7FCDCD;
    align-self: center;
    

    font-family: 'MajorMonoDisplay', monospace;
    font-size: 50px;
    font-weight: bold;
    
    filter: drop-shadow(8px 5px blue) sepia(30%);

    &:hover {
        background: #fff;
        color: #000;
        border-radius: 50px;

        animation: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        display: none;

    }
`

export const NavMenu = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;

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

export const NavMenuOpen = styled(BiMenuAltRight)` 
    width: 50px; 
    height: 50px; 
    color: #fff;
`

export const NavMenuClose = styled(MdClose)` 
    width: 50px; 
    height: 50px;
    color: #fff;
`

export const NavBtn = styled(Button)`
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 8px;
    margin-right: 10px;
    color: #000;
    
    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        margin-left: auto;
    }
    
`;

export const NavLogo = styled.img`
    width: 60px;
    height: 60px;
    align-self: center;
    background: none;
    
    &:hover {
        align-self: flex-start;
        background: #fff;
        border-radius: 50px;
    }
`;
