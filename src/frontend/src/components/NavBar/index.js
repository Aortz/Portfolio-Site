import React from 'react';
import {
  Nav,
  NavLogo,
  NavText,
  NavItems,
  NavItem
} from './NavbarElements';
import PersonalLogo from '../../assets/personal-icon/personal-logo-transparent.png';
import { GlobalStyles } from '../Fonts/Fonts';
  
const Navbar = ({ scrollToSection, refs }) => {
  return (
    <>
      <Nav>
        <GlobalStyles />
        <NavLogo 
          src={PersonalLogo} 
          onClick={() => scrollToSection(refs.homeRef)}
        />
        {/* <NavText onClick={() => scrollToSection(refs.homeRef)}> Junwei </NavText> */}
        <NavItems>
          <NavItem onClick={() => scrollToSection(refs.homeRef)}>1. HOME</NavItem>
          <NavItem onClick={() => scrollToSection(refs.aboutRef)}>2. ABOUT ME</NavItem>
          <NavItem onClick={() => scrollToSection(refs.projectsRef)}>3. PROJECTS</NavItem>
        </NavItems>
      </Nav>
    </>
  );
};
  
export default Navbar;