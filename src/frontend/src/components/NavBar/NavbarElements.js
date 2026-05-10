import { NavLink as Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

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
    height: auto;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space[2]};
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

  @media screen and (max-width: 768px) {
    gap: ${({ theme }) => theme.space[3]};
  }
`;

export const NavLinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};

  @media screen and (max-width: 768px) {
    gap: ${({ theme }) => theme.space[3]};
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

export const VerticalNav = styled.nav`
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
  z-index: 5;
  padding: ${({ theme }) => `${theme.space[8]} ${theme.space[3]}`};
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
`;

export const VerticalNavText = styled.div`
  display: none;
`;

const iconBase = `
  width: 28px;
  height: 28px;
  align-self: center;
  stroke-width: 1.75;
  transition: color 250ms cubic-bezier(0.2, 0.8, 0.2, 1);
`;

export const StyledGHLogo = styled(FiGithub)`
  ${iconBase}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const StyledInstaLogo = styled(FiInstagram)`
  ${iconBase}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export const StyledLinkedinLogo = styled(FiLinkedin)`
  ${iconBase}
  color: ${({ theme }) => theme.color.fgMuted};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const navLinkStyles = `
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  position: relative;
`;

export const NavLink = styled(Link)`
  ${navLinkStyles}
  color: ${({ theme }) => theme.color.fg};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.sm};
  padding: ${({ theme }) => `${theme.space[1]} 0`};
  transition: color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

  animation: ${({ animate }) => (animate ? slideLeftAnimation : 'none')} 1s forwards;

  &.active { color: ${({ theme }) => theme.color.accent}; }
  &:hover  { color: ${({ theme }) => theme.color.accent}; }
`;

export const NavAnchor = styled.a`
  ${navLinkStyles}
  color: ${({ theme }) => theme.color.fg};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.size.sm};
  padding: ${({ theme }) => `${theme.space[1]} 0`};
  transition: color ${({ theme }) => theme.motion.base} ${({ theme }) => theme.motion.ease};

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

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
  &:hover::after {
    transform: scaleX(1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  @media screen and (max-width: 768px) {
    font-size: ${({ theme }) => theme.size.xs};
    letter-spacing: 0.02em;
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

export const NavLogo = styled.img`
  width: 48px;
  height: 48px;
  align-self: center;
  background: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.ease};

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
