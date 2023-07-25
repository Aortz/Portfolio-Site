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
import { GlobalStyles } from '../Fonts/Fonts';
  
const Navbar = ({ navbarOpen, setNavbarOpen }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    setNavbarOpen(false);
  }

  return (
    <>
      <Nav className={navbarOpen ? 'open' : ''}>
        <GlobalStyles />
        <NavLogo 
          src={PersonalLogo} 
          onClick={handleLogoClick}
        />
        <NavText onClick={handleLogoClick}> Junwei </NavText>
        <NavBtn
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          {navbarOpen ? (
            <>
              <NavMenuClose  />
            </>
            ) : (
              <NavMenuOpen/>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;