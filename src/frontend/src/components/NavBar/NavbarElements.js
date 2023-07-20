import { FaBars } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    background: #2f3c69;
    height: 85px;
    display: flex;
    justify-content: start;
    padding: 0.2rem calc((100vw - 1200px) / 2);
    z-index: 12;
    /* Third Nav */
    /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: left;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #00deb9;
    }
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #808080;

    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #ffffff;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    background-color: #333;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        display: none;
    }
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 9;
    font-size: 24px;
    box-shadow: 0 10px 15px -3px rgb(46 41 51 / 8%), 0 4px 6px -2px rgb(71 63 79 / 16%);
    transition: transform ease-in-out 0.2s;
    /* transition: width ease 0.2s; */
`;

export const NavBtn = styled(Button)`
    position: fixed;
    left: 1125px;
    cursor: pointer;
    color: #fff;
    background: transparent;;
    border: none;
    /* Third Nav */
    /* justify-content: flex-end;
    width: 100vw; */
    @media screen and (max-width: 768px) {
        display: none;
    }
    
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #000000;
    padding: 10px 22px;
    color: #000000;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #808080;
    }
`;
