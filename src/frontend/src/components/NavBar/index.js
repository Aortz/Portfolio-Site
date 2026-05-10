import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Nav,
  NavLeft,
  NavRight,
  NavLinkRow,
  NavAnchor,
  NavLogo,
  NavText,
  NavBtn,
  NavMenuClose,
  NavMenuOpen,
} from './NavbarElements';
import PersonalLogo from '../../assets/personal-icon/personal-logo-transparent.png';
import ThemeToggle from '../ThemeToggle';

const Navbar = ({ navbarOpen, setNavbarOpen }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setNavbarOpen(false);
  };

  return (
    <Nav className={navbarOpen ? 'open' : ''}>
      <NavLeft>
        <NavLogo src={PersonalLogo} onClick={handleLogoClick} alt="Junwei logo" />
        <NavText onClick={handleLogoClick}>Junwei</NavText>
      </NavLeft>

      <NavRight>
        <NavLinkRow>
          <NavAnchor href="#home">1. HOME</NavAnchor>
          <NavAnchor href="#about">2. ABOUT ME</NavAnchor>
          <NavAnchor href="#projects">3. PROJECTS</NavAnchor>
          <NavAnchor href="#resume">4. RESUME</NavAnchor>
        </NavLinkRow>
        <ThemeToggle />
        <NavBtn
          onClick={() => setNavbarOpen((prev) => !prev)}
          aria-label={navbarOpen ? 'Close menu' : 'Open menu'}
        >
          {navbarOpen ? <NavMenuClose /> : <NavMenuOpen />}
        </NavBtn>
      </NavRight>
    </Nav>
  );
};

export default Navbar;
