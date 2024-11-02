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
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;  /* Ensure navbar sticks to top */
    top: 0;
    z-index: 999;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 768px) {
        justify-content: center;
        height: 65px;
    }
`;

export const NavLogo = styled.img`
    width: 50px;
    height: 50px;
    align-self: center;
    background: none;
    
    &:hover {
        align-self: flex-start;
        background: #fff;
        border-radius: 50px;
    }
`;

export const VerticalNav = styled.nav`
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    bottom: 35vh; /* Stick to the bottom of the screen */
    left: 0; /* Stick to the left of the screen */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align items */
    z-index: 999;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    opacity: 1;
    transform: translateX(0);
    animation: ${slideUpAnimation} 2s ease-in-out forwards;

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

export const VerticalDivider = styled.div`
    width: 1px;              /* Thickness of the line */
    height: 70px;            /* Length of the line */
    background-color: #98B4D4; /* Color of the line */
    margin: 5px 0;          /* Spacing above and below the line */

    @media screen and (max-width: 768px) {
        display: none;       /* Hide on smaller screens if desired */
    }
`;

export const StyledGHLogo = styled(FaGithub)`
    width: 30px;
    height: 30px;
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
    color: rgba(255, 255, 255, 0.9);
    text-align: right;
    text-decoration: none;

    font-family: 'VT323', monospace;
    font-size: 35px;
    font-weight: 500;

    animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;

    width: 100%;
    cursor: pointer;
    &.active {
        color: #C3447A;
    }

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #98B4D4;
        color: #fff;
        font-size: 35px;
        font-weight: 600;
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        font-family: 'MoiraiOne', monospace;
    }
`;

export const NavText = styled.p`
    color: #7FCDCD;
    align-self: center;
    margin-left: 40px;
    font-family: 'VT323', monospace;
    font-size: 40px; /* Reduced size for better fit */
    font-weight: bold;
    
    filter: drop-shadow(8px 5px blue) sepia(30%);
    cursor: pointer;

    &:hover {
        background: #fff;
        color: #000;
        border-radius: 50px;
        /* Removed spin animation for simplicity */
    }

    /* Account for mobile devices */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItems = styled.div`
    display: flex;
    gap: 2rem;
    margin-right: 50px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.div`
  cursor: pointer;
  color: #acbcfc; /* Changed for better visibility */
  font-size: 22px;
  font-family: 'VT323', monospace;

  &:hover {
    color: #98B4D4;
  }
`;

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
