import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Nav,
  NavLeft,
  NavRight,
  NavLinkRow,
  NavAnchor,
  NavLogo,
} from './NavbarElements';
import PersonalLogo from '../../assets/personal-icon/personal-logo-transparent.png';
import ThemeToggle from '../ThemeToggle';
import GridToggle from '../GridToggle';
import ParticleSpeedToggle from '../ParticleSpeedToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate('/#home');

  return (
    <Nav>
      <NavLeft>
        <NavLogo
          src={PersonalLogo}
          onClick={handleLogoClick}
          alt="Junwei logo"
        />
      </NavLeft>

      <NavRight>
        <NavLinkRow>
          <NavAnchor href="#home">1. HOME</NavAnchor>
          <NavAnchor href="#about">2. ABOUT ME</NavAnchor>
          <NavAnchor href="#projects">3. PROJECTS</NavAnchor>
          <NavAnchor href="#gallery">4. GALLERY</NavAnchor>
          <NavAnchor href="#resume">5. RESUME</NavAnchor>
        </NavLinkRow>
        <GridToggle />
        <ParticleSpeedToggle />
        <ThemeToggle />
      </NavRight>
    </Nav>
  );
};

export default Navbar;
