import React from 'react';
import {
  VerticalNav,
  VerticalNavLogo,
  StyledGHLogo,
  StyledLinkedinLogo,
  VerticalNavText,
  StyledInstaLogo,
} from './NavbarElements';

const VerticalNavbar = () => (
  <VerticalNav>
    <VerticalNavText>{'|'}</VerticalNavText>
    <VerticalNavLogo href="https://github.com/Aortz" target="_blank" rel="noreferrer">
      <StyledGHLogo />
    </VerticalNavLogo>
    <VerticalNavLogo
      href="https://www.instagram.com/_lee_thargic/"
      target="_blank"
      rel="noreferrer"
    >
      <StyledInstaLogo />
    </VerticalNavLogo>
    <VerticalNavLogo
      href="https://www.linkedin.com/in/lee-junwei/"
      target="_blank"
      rel="noreferrer"
    >
      <StyledLinkedinLogo />
    </VerticalNavLogo>
    <VerticalNavText>{'|'}</VerticalNavText>
  </VerticalNav>
);

export default VerticalNavbar;
