import React from 'react';
import {
  Nav,
  NavLogo,
  NavText,
  NavBtn,
  NavMenuClose,
  NavMenuOpen,
} from './NavbarElements';
import { useNavigate } from 'react-router-dom';
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
      <NavLogo src={PersonalLogo} onClick={handleLogoClick} alt="Junwei logo" />
      <NavText onClick={handleLogoClick}> Junwei </NavText>
      <ThemeToggle />
      <NavBtn
        onClick={() => setNavbarOpen((prev) => !prev)}
        aria-label={navbarOpen ? 'Close menu' : 'Open menu'}
      >
        {navbarOpen ? <NavMenuClose /> : <NavMenuOpen />}
      </NavBtn>
    </Nav>
  );
};
  
export default Navbar;