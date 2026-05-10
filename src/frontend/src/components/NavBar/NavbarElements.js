import Button from '@mui/material/Button';
import { NavLink as Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { BiMenuAltRight } from 'react-icons/bi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideLeftAnimation = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
`;

export const Nav = styled.nav`
  background-color: transparent;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[6]}`};

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    height: 65px;
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  }
`;

export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
`;

/* Desktop link row: 1. HOME / 2. ABOUT ME / 3. PROJECTS / 4. RESUME */
export const NavLinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const VerticalNav = styled.nav`
  background-color: transparent;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  z-index: 999;
  padding: ${({ theme }) => `${theme.space[6]} ${theme.space[3]}`};
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: 0.4s;

  /* Thin vertical line running through the icons */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: ${({ theme }) => theme.color.border};
    z-index: -1;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const VerticalNavLogo = styled.a`
  padding: ${({ theme }) => theme.space[2]};
  background: ${({ theme }) => theme.color.bg};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: translateY(-2px);
  }
`;

export const VerticalNavText = styled.div`
  display: none; /* legacy "|" marks replaced by the ::before vertical line */
`;

const iconBase = `
  width: 20px;
  height: 20px;
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
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.sm};
  font-weight: 500;
  letter-spacing: 0.04em;
  padding: ${({ theme }) => `${theme.space[1]} 0`};
  cursor: pointer;
  position: relative;
  transition: color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.color.accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};
  }

  &.active {
    color: ${({ theme }) => theme.color.accent};
  }

  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }

  /* Mobile menu version (rendered inside <NavMenu>) */
  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: ${({ theme }) => theme.size.lg};
    padding: ${({ theme }) => theme.space[3]} 0;
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
  width: 48px;
  height: 48px;
  cursor: pointer;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.color.fg};

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const NavLogo = styled.img`
  width: 48px;
  height: 48px;
  align-self: center;
  background: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: scale(1.05);
  }
`;
