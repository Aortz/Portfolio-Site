import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import VT323RegularTTF from '../../assets/fonts/VT323/VT323-Regular.ttf';
import MoiraiOne from '../../assets/fonts/MoiraiOne/MoiraiOne-Regular.ttf';import IBMPlexMonoBold from '../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf';
import MajorMonoDisplay from '../../assets/fonts/Major_Mono_Display/MajorMonoDisplay-Regular.ttf';
import PressStart2P from '../../assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf';
import { MdClose } from 'react-icons/md';
import { BiMenuAltRight } from 'react-icons/bi';


export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'VT323';
    src: url(${VT323RegularTTF}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  @font-face {
    font-family: 'PressStart2P';
    src: url(${PressStart2P}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  @font-face {
    font-family: 'MoiraiOne';
    src: url(${MoiraiOne}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

  @font-face {
    font-family: 'MajorMonoDisplay';
    src: url(${MajorMonoDisplay}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }
  @font-face {
    font-family: 'IBMPlexMonoBold';
    src: url(${IBMPlexMonoBold}) format('truetype');
    /* You can specify additional font styles here if needed, such as font-weight and font-style */
  }

`;

export const Nav = styled.nav`
    background-color: rgba(0, 0, 0, 0.9);
    height: 85px;
    display: flex;
    justify-content: end;
    align-items: center;
    z-index: 999;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999; /* Ensure the navbar is on top */
`;

export const NavLink = styled(Link)`
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

export const NavText = styled.div`
    color: #737378;
    align-self: safe center;
    margin-right: 600px; /* Adding some space between the child elements */
    margin-left: 60px;
    font-family: 'MajorMonoDisplay', monospace;
    font-size: 50px;
    font-weight: 500;
`

export const NavMenu = styled.div`
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
    display: none;
    @media screen and (max-width: 768px) {
        display: none;
    }
    
`;

export const NavLogo = styled.img`
    width: 80px;
    height: 80px;
    align-self: safe center;
    background: none;
    @media screen and (max-width: 768px) {
        display: none;
    }
    
`;
