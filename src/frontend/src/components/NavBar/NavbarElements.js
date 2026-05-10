import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { BiMenuAltRight } from 'react-icons/bi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const slideUpAnimation = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const slideLeftAnimation = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
`;

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.color.bg};
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  padding: ${({ theme }) => theme.space[2]};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  @media screen and (max-width: 768px) {
    justify-content: center;
    height: 65px;
  }
`;

export const VerticalNav = styled.nav`
  background-color: transparent;
  position: fixed;
  bottom: ${({ theme }) => theme.space[4]};
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  z-index: 999;
  padding: ${({ theme }) => theme.space[3]};

  opacity: 0;
  transform: translateY(100%);
  animation: ${slideUpAnimation} 1s ease-in-out forwards;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const VerticalNavLogo = styled.a`
  padding: ${({ theme }) => theme.space[1]};
  align-self: center;
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const VerticalNavText = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size['2xl']};
  font-weight: 300;
  color: ${({ theme }) => theme.color.fgSubtle};
  line-height: 1;
`;

const iconBase = `
  width: 22px;
  height: 22px;
  align-self: center;
  transition: color 250ms cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const StyledGHLogo = styled(FaGithub)`
  ${iconBase}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const StyledInstaLogo = styled(FaInstagram)`
  ${iconBase}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const StyledLinkedinLogo = styled(FaLinkedin)`
  ${iconBase}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.color.fg};
  text-align: right;
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xl};
  font-weight: 500;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  width: 100%;
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease},
    background ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;

  &.active {
    color: ${({ theme }) => theme.color.accent};
  }

  &:hover {
    color: ${({ theme }) => theme.color.accent};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: ${({ theme }) => theme.size.lg};
    font-family: ${({ theme }) => theme.font.mono};
  }
`;

export const NavText = styled.div`
  color: ${({ theme }) => theme.color.fg};
  align-self: center;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.xl};
  font-weight: 600;
  letter-spacing: 0.02em;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavMenu = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg};
  z-index: 9;
  font-size: ${({ theme }) => theme.size.lg};
  width: 100%;
  height: 100%;
  transition: transform ease-in-out 0.2s;

  li {
    margin-right: ${({ theme }) => theme.space[4]};

    @media screen and (max-width: 768px) {
      margin-right: 0;
      margin-bottom: ${({ theme }) => theme.space[2]};
    }
  }
`;

export const NavMenuOpen = styled(BiMenuAltRight)`
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.color.fg};
`;

export const NavMenuClose = styled(MdClose)`
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.color.fg};
`;

export const NavBtn = styled(Button)`
  width: 56px;
  height: 56px;
  cursor: pointer;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space[2]};
  margin-right: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.color.fg};

  @media screen and (max-width: 768px) {
    margin-left: auto;
  }
`;

export const NavLogo = styled.img`
  width: 56px;
  height: 56px;
  align-self: center;
  background: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: scale(1.05);
  }
`;
