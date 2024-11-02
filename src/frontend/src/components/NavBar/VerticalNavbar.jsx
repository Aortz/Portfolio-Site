import React from 'react';
import {
  VerticalNav,
  VerticalNavLogo,
  StyledGHLogo,
  StyledLinkedinLogo,
  VerticalDivider,
  StyledInstaLogo
} from './NavbarElements';
import { GlobalStyles } from '../Fonts/Fonts';

const VerticalNavbar = () =>{
    return (
        <>
          <VerticalNav>
            <GlobalStyles />
            <VerticalDivider />
            <VerticalNavLogo href="https://github.com/Aortz" target="_blank">
              <StyledGHLogo />
            </VerticalNavLogo>
            <VerticalNavLogo href="https://www.instagram.com/_lee_thargic/" target="_blank">
              <StyledInstaLogo />
            </VerticalNavLogo>
            <VerticalNavLogo href="https://www.linkedin.com/in/lee-junwei/" target="_blank">
              <StyledLinkedinLogo />
            </VerticalNavLogo>
            <VerticalDivider />
          </VerticalNav>
        </>
      );
}

export default VerticalNavbar;