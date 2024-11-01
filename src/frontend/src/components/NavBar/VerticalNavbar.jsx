import React from 'react';
import {
  VerticalNav,
  VerticalNavLogo,
  StyledGHLogo,
  StyledLinkedinLogo,
  VerticalNavText,
  StyledInstaLogo
} from './NavbarElements';
import { GlobalStyles } from '../Fonts/Fonts';

const VerticalNavbar = () =>{
    return (
        <>
          <VerticalNav>
            <GlobalStyles />
            <VerticalNavText>
              {"|"}
            </VerticalNavText>
            <VerticalNavLogo href="https://github.com/Aortz" target=" _blank">
              <StyledGHLogo />
            </VerticalNavLogo>
            <VerticalNavLogo href="https://www.instagram.com/_lee_thargic/" target=" _blank">
              <StyledInstaLogo />
            </VerticalNavLogo>
            <VerticalNavLogo href="https://www.linkedin.com/in/lee-junwei/" target=" _blank">
              <StyledLinkedinLogo />
            </VerticalNavLogo>
            <VerticalNavText>
              {"|"}
            </VerticalNavText>
          </VerticalNav>
        </>
      );
}

export default VerticalNavbar;